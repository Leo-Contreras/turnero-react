const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'turnero-prueba',
    user: 'turnero_modulo',
    password: 'adbc2023',
});
client.connect();

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
        // Tu código aquí...
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




app.post('/api/turnos', (req, res) => {
    const { modulo, estado, tiempo_inicio, tiempo_fin } = req.body;
    const query = {
        text: 'INSERT INTO tabla_turnos (modulo, estado, tiempo_inicio, tiempo_fin) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [modulo, estado, tiempo_inicio, tiempo_fin],
    };
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            const turno = result.rows[0]; // El turno completo es devuelto por la consulta
            res.status(200).json(turno);  // Enviamos el turno completo como respuesta
        }
    });
});

app.post('/api/modulos', (req, res) => {
    const { nombre, password } = req.body;
    const query = `INSERT INTO usuario_modulo (nombre, clave) VALUES ('${nombre}', '${password}') RETURNING *`;
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: err});
        } else {
            res.status(200).json(result.rows[0]);
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
app.delete('/api/modulos/:nombre', (req, res) => {
    const { nombre } = req.params;

    let query = `DELETE FROM tabla_turnos WHERE modulo = '${nombre}'`;
    client.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            // Luego, elimina el módulo.
            query = `DELETE FROM usuario_modulo WHERE nombre = '${nombre}'`;
            client.query(query, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ message: 'Módulo y sus turnos eliminados con éxito' });
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('API server running on port 3000');
});

