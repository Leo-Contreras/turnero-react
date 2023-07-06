import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './paginas/Login/Login';
import RegistroCaja from './paginas/RegistroCaja/RegistroCaja';
import InformacionEmpresa from './paginas/InformacionEmpresa/InformacionEmpresa';
import ResetearTurnos from './paginas/ResetearTurnos/ResetearTurnos';
import SolicitarTurno from './paginas/SolicitarTurno/SolicitarTurno';
import ListaDeCajas from "./paginas/Lista de cajas/ListaDeCajas";
import TurnViewer from "./paginas/TurnViewer/TurnViewer";
import Menu from "./paginas/Menu/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import {API_URL_TURNERO, ESTADO_PENDIENTE} from "./ENV/constantes";


function App() {

    const [modulos, setModulos] = useState([]);
    const [listaTurnos, setListaTurnos] = useState([]);

    useEffect(() => {
        // Cargar los modulos
        fetch(API_URL_TURNERO + 'modulos')
            .then(response => response.json())
            .then(data => setModulos(data))
            .catch(error => console.error('Error:', error));

        // Cargar los turnos
        fetch(API_URL_TURNERO + 'turnos')
            .then(response => response.json())
            .then(data => setListaTurnos(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const [cajaAutenticada, setCajaAutenticada] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);

    const handleRegistrarModulo = (modulo) => {
        fetch(API_URL_TURNERO + "modulos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modulo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Modulo creado: ', data);
                // Luego de crear el modulo, puedes solicitar la lista actualizada de modulos
                fetch('/api/modulos')
                    .then(response => response.json())
                    .then(data => setModulos(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleDeleteTurno = (turno) => {
        setListaTurnos((prevTurnos) =>
            prevTurnos.filter((t) => t.Turno !== turno.Turno)
        );
    };
    const handleBorrarCaja = (cajaNombre) => {
        if (
            window.confirm(
                `¿Estás seguro de que quieres borrar el módulo ${cajaNombre} y todos sus turnos?`
            )
        ) {
            fetch(API_URL_TURNERO + "modulos/" + cajaNombre, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // Actualizar la UI solo si la operación de borrado en el servidor fue exitosa.
                    setModulos((prevCajas) =>
                        prevCajas.filter((caja) => caja.nombre !== cajaNombre)
                    );
                    setListaTurnos((prevTurnos) =>
                        prevTurnos.filter((turno) => turno.Caja !== cajaNombre)
                    );
                })
                .catch((error) => console.log(error));
        }
    };
    const solicitarTurno = (caja_nombre) => {
        const nuevoTurno = {
            modulo: caja_nombre,
            estado: ESTADO_PENDIENTE,
            tiempo_inicio: null,
            tiempo_fin: null,
        };
        return fetch(API_URL_TURNERO + 'turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoTurno),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Turno creado: ', data);
                // Luego de crear el turno, puedes solicitar la lista actualizada de turnos
                fetch(API_URL_TURNERO + 'turnos')
                    .then(response => response.json())
                    .then(data => setListaTurnos(data));
                return data.turno; // Suponiendo que el servidor devuelve el turno creado, con su id
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    const abrirTurno = (turno) => {
        fetch(API_URL_TURNERO + "turnos/" + turno.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...turno,
                estado: 'abierto',  // Aquí
                tiempo_inicio: new Date().toISOString()  // Y aquí
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Actualiza la lista de turnos con la información actualizada
                setListaTurnos((prevTurnos) => {
                    const updatedTurno = data; // Usa la respuesta del servidor
                    const filteredTurnos = prevTurnos.filter((t) => t.Turno !== turno.Turno);
                    return [updatedTurno, ...filteredTurnos];
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const cerrarTurno = (turno) => {
        fetch(API_URL_TURNERO + "turnos/" + turno.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...turno,
                estado: 'terminado',  // Aquí
                tiempo_fin: new Date().toISOString()  // Y aquí
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Actualiza la lista de turnos con la información actualizada
                setListaTurnos((prevTurnos) =>
                    prevTurnos.map((t) =>
                        t.Turno === turno.Turno
                            ? data // Usa la respuesta del servidor
                            : t
                    )
                );
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleLogin = async (nombre, password) => {
        try {
            const response = await fetch(API_URL_TURNERO + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, password })
            });

            if (!response.ok) {
                console.log(nombre,password);
                throw new Error('error');
            }

            const moduloEncontrado = await response.json();

            setCajaAutenticada(moduloEncontrado);
            setEstaAutenticado(true);
            console.log(`Inicio de sesión exitoso para: ${nombre}`);

        } catch (error) {
            console.log(error.message);
            // Aquí puedes manejar el error de inicio de sesión
        }
    };
    const handleLogout = () => {
        setCajaAutenticada(null);
        setEstaAutenticado(false);
        console.log('Sesión cerrada');
    };



    return (
        <div className="App">
                <div className="MainContent">
                        <Router>
                            <Routes>
                                <Route
                                    path="/login"
                                    element={
                                        <Login
                                            onLogin={handleLogin}
                                            onLogout={handleLogout}
                                            estaAutenticado={estaAutenticado}
                                            cajaAutenticada={cajaAutenticada}
                                            listaTurnos={listaTurnos}
                                            onDelete={handleDeleteTurno}
                                            abrirTurno={abrirTurno}
                                            cerrarTurno={cerrarTurno}
                                        />
                                    }
                                />
                                <Route path="/registrar-caja" element={<RegistroCaja onRegistrarCaja={handleRegistrarModulo} onBorrarCaja={handleBorrarCaja} cajas={modulos} />} />
                                <Route path="/lista-cajas" element={<ListaDeCajas cajas={modulos} onBorrarCaja={handleBorrarCaja} />} />
                                <Route path="/informacion-empresa" element={<InformacionEmpresa />} />
                                <Route path="/resetear-turnos" element={<ResetearTurnos />} />
                                <Route path="/solicitar-turno" element={<SolicitarTurno cajas={modulos} onSolicitarTurno={solicitarTurno} />} />
                                <Route path="/visualizador-turnos" element={<TurnViewer turnos={listaTurnos} />} />
                                <Route path="/" element={<Menu />} /> {/* Página de inicio, por ejemplo. */}
                            </Routes>
                        </Router>
                </div>
        </div>
    );
}

export default App;
