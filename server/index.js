const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const expressWs = require('express-ws');
require('dotenv').config();
const Joi = require('joi');

const app = express();
const wsApp = expressWs(app);

app.use(cors()); // Agrega el middleware CORS a tu aplicación de Express
app.use(express.json()); // Agrega el middleware para analizar el cuerpo de las solicitudes JSON
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal' });
});

console.log("Host:" + process.env.PGHOST);
console.log("Puerto (5432 por defecto):" + process.env.PGPORT);
console.log("Nombre de Base de datos:" + process.env.PGDATABASE);
console.log("Usuario Base de datos ( importante recordar los permisos ):" + process.env.PGUSER);
console.log("Contraseña de Usuario Base de datos:" + process.env.PGPASSWORD);

const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
});

const turnoSchema = Joi.object({
    modulo: Joi.string().required(),
    estado: Joi.string().valid('pendiente', 'abierto', 'terminado').required(),
    tiempo_inicio: Joi.date().allow(null),
    tiempo_fin: Joi.date().allow(null)
});

client.connect();
let sockets = new Set();

app.ws('/ws', (ws, req) => {
    // Cuando un nuevo cliente se conecte, lo agregamos al conjunto
    sockets.add(ws);

    const queryTurnos = 'SELECT * FROM tabla_turnos';
    const queryModulos = 'SELECT * FROM usuario_modulo';

    // Obtén y envía los turnos.
    client.query(queryTurnos, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            ws.send(JSON.stringify({ type: 'turnos', turnos: result.rows }));
        }
    });

    // Obtén y envía los módulos.
    client.query(queryModulos, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            ws.send(JSON.stringify({ type: 'modulos', modulos: result.rows }));
        }
    });

    // Cuando un cliente se desconecta, lo eliminamos del conjunto
    ws.on('close', () => {
        sockets.delete(ws);
    });
});

app.get('/api/turnos', (req, res) => {
    const query = 'SELECT * FROM tabla_turnos';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.get('/api/turnos/:modulo', (req, res) => {
    const { modulo } = req.params;
    const query = {
        text: 'SELECT * FROM tabla_turnos WHERE modulo = $1',
        values: [modulo],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.put('/api/turnos/:id', (req, res) => {
    const { id } = req.params;
    const { modulo, estado, tiempo_inicio, tiempo_fin } = req.body;

    if (estado === 'pendiente') {
        const query = {
            text: 'UPDATE tabla_turnos SET estado = $1 WHERE id = $2 RETURNING *',
            values: [estado, id],
        };

        client.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: err.stack});
            } else {
                if (result.rows.length > 0) {
                    res.status(200).json(result.rows[0]);
                } else {
                    res.status(404).json({error: "No se encontró el turno"});
                }
            }
        });
    } else if (estado === 'abierto') {
        const query = {
            text: 'UPDATE tabla_turnos SET estado = $1, tiempo_inicio = $2 WHERE id = $3 RETURNING *',
            values: [estado, new Date(tiempo_inicio), id],
        };

        client.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: err.stack});
            } else {
                if (result.rows.length > 0) {
                    res.status(200).json(result.rows[0]);
                } else {
                    res.status(404).json({error: "No se encontró el turno"});
                }
            }
        });
    } else if (estado === 'terminado') {
        const query = {
            text: 'UPDATE tabla_turnos SET estado = $1, tiempo_inicio = $2, tiempo_fin = $3 WHERE id = $4 RETURNING *',
            values: [estado, new Date(tiempo_inicio), new Date(tiempo_fin), id],
        };

        client.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({error: err.stack});
            } else {
                if (result.rows.length > 0) {
                    res.status(200).json(result.rows[0]);
                } else {
                    res.status(404).json({error: "No se encontró el turno"});
                }
            }
        });
    } else {
        res.status(400).json({error: "Estado no válido"});
    }
});




app.post('/api/turnos', (req, res, next) => {
    // Valida la entrada del usuario
    const { error } = turnoSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { modulo, estado, tiempo_inicio, tiempo_fin } = req.body;
    const query = {
        text: 'INSERT INTO tabla_turnos (modulo, estado, tiempo_inicio, tiempo_fin) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [modulo, estado, tiempo_inicio, tiempo_fin],
    };
    client.query(query, (err, result) => {
        if (err) {
            next(err);  // Pasa el error al middleware de manejo de errores
        } else {
            const turno = result.rows[0]; // El turno completo es devuelto por la consulta
            res.status(200).json(turno);  // Enviamos el turno completo como respuesta

            // Envía el nuevo turno a todos los clientes conectados.
            const message = JSON.stringify({ type: 'turnos', turnos: [turno] });
            sockets.forEach((client) => client.send(message));
        }
    });
});


app.post('/api/modulos', (req, res) => {
    const { nombre, password } = req.body;
    const query = {
        text: 'INSERT INTO usuario_modulo (nombre, clave) VALUES ($1, $2) RETURNING *',
        values: [nombre, password],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            const modulo = result.rows[0];
            res.status(200).json(modulo);

            // Envía el nuevo módulo a todos los clientes conectados.
            const message = JSON.stringify({ type: 'modulos', modulos: [modulo] });
            sockets.forEach((client) => client.send(message));
        }
    });
});

app.post('/api/login', (req, res) => {
    const { nombre, password } = req.body;
    const query = {
        text: 'SELECT * FROM usuario_modulo WHERE nombre = $1 AND clave = $2',
        values: [nombre, password],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            if (result.rows.length > 0) {
                const moduloEncontrado = result.rows[0];
                res.status(200).json(moduloEncontrado);
            } else {
                res.status(401).json({message: 'Error: combinación de nombre y contraseña incorrecta'});
            }
        }
    });
});
app.get('/api/modulos', (req, res) => {
    const query = 'SELECT * FROM usuario_modulo';
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.delete('/api/modulos/:nombre', (req, res, next) => {
    const { nombre } = req.params;

    // Agrupa las operaciones en una transacción
    client.query('BEGIN', (err) => {
        if (err) next(err);

        // Primero, elimina los turnos asociados al módulo.
        let query = {
            text: 'DELETE FROM tabla_turnos WHERE modulo = $1',
            values: [nombre]
        };
        client.query(query, (err, result) => {
            if (err) {
                return client.query('ROLLBACK', (errRollback) => {
                    if (errRollback) {
                        next(errRollback);
                    } else {
                        next(err);
                    }
                });
            } else {
                // Luego, elimina el módulo.
                query = {
                    text: 'DELETE FROM usuario_modulo WHERE nombre = $1 RETURNING *',
                    values: [nombre]
                };
                client.query(query, (err, result) => {
                    if (err) {
                        return client.query('ROLLBACK', (errRollback) => {
                            if (errRollback) {
                                next(errRollback);
                            } else {
                                next(err);
                            }
                        });
                    } else {
                        client.query('COMMIT', (errCommit) => {
                            if (errCommit) {
                                next(errCommit);
                            } else {
                                res.status(200).json({ message: 'Módulo y sus turnos eliminados con éxito' });
                            }
                        });
                    }
                });
            }
        });
    });
});

app.listen(3000, () => {
    console.log('API server running on port 3000');
});

