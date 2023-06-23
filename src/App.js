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
import {ESTADO_EN_PROCESO, ESTADO_PENDIENTE, ESTADO_TERMINADO} from "./ENV/constantes";



function App() {

    const [listaTurnos, setListaTurnos] = useState([
        { Caja: "MODULO 1", Turno: 1, Estado: ESTADO_PENDIENTE, TiempoInicio: null, TiempoFin: null },
        { Caja: "MODULO 2", Turno: 2, Estado: ESTADO_PENDIENTE, TiempoInicio: null, TiempoFin: null },
        { Caja: "MODULO 1", Turno: 3, Estado: ESTADO_PENDIENTE, TiempoInicio: null, TiempoFin: null },
        { Caja: "MODULO 2", Turno: 4, Estado: ESTADO_PENDIENTE, TiempoInicio: null, TiempoFin: null },
        { Caja: "MODULO 1", Turno: 5, Estado: ESTADO_PENDIENTE, TiempoInicio: null, TiempoFin: null },
    ]);

    const [cajas, setCajas] = useState([
        { nombre: "MODULO 1", password: "password1" },
        { nombre: "MODULO 2", password: "password2" },
        { nombre: "ADBC", password: "password3" },
    ]);

    const [cajaAutenticada, setCajaAutenticada] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);

    const handleRegistrarCaja = (caja) => {
        setCajas([...cajas, caja]);
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
            setCajas((prevCajas) =>
                prevCajas.filter((caja) => caja.nombre !== cajaNombre)
            );
            setListaTurnos((prevTurnos) =>
                prevTurnos.filter((turno) => turno.Caja !== cajaNombre)
            );
        }
    };

    const solicitarTurno = (caja_nombre) => {
        setListaTurnos((prevTurnos) => [
            ...prevTurnos,
            {
                Caja: caja_nombre,
                Turno: prevTurnos.length + 1,
                Estado: ESTADO_PENDIENTE,
                TiempoInicio: null,
                TiempoFin: null,
            },
        ]);
    };

    const abrirTurno = (turno) => {
        setListaTurnos((prevTurnos) => {
            const updatedTurno = { ...turno, Estado: ESTADO_EN_PROCESO, TiempoInicio: Date.now() };
            const filteredTurnos = prevTurnos.filter((t) => t.Turno !== turno.Turno);
            return [updatedTurno, ...filteredTurnos];
        });
    };


    const cerrarTurno = (turno) => {
        setListaTurnos((prevTurnos) =>
            prevTurnos.map((t) =>
                t.Turno === turno.Turno
                    ? { ...t, Estado: ESTADO_TERMINADO, TiempoFin: Date.now() }
                    : t
            )
        );
    };


    const handleLogin = (nombre, password) => {
        const moduloEncontrado = cajas.find(caja => caja.nombre === nombre && caja.password === password);

        if (moduloEncontrado) {
            setCajaAutenticada(moduloEncontrado);
            setEstaAutenticado(true); // Ajusta el estado a true cuando el login es exitoso
            console.log(`Inicio de sesión exitoso para: ${nombre}`);
        } else {
            console.log('Error: combinación de nombre y contraseña incorrecta');
            // Aquí puedes manejar el error de inicio de sesión
        }
    };

    const handleLogout = () => {
        setCajaAutenticada(null);
        setEstaAutenticado(false);
        console.log('Sesión cerrada');
    };

    useEffect(() => {
        // Al montar el componente, intenta cargar los datos del localStorage.
        const loadedTurnos = localStorage.getItem("turnos");
        const loadedCajas = localStorage.getItem("cajas");

        if (loadedTurnos) {
            setListaTurnos(JSON.parse(loadedTurnos));
        }

        if (loadedCajas) {
            setCajas(JSON.parse(loadedCajas));
        }
    }, []);

    useEffect(() => {
        // Cuando listaTurnos o cajas cambien, actualiza el localStorage.
        localStorage.setItem("turnos", JSON.stringify(listaTurnos));
        localStorage.setItem("cajas", JSON.stringify(cajas));
    }, [listaTurnos, cajas]);


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
                                <Route path="/registrar-caja" element={<RegistroCaja onRegistrarCaja={handleRegistrarCaja} onBorrarCaja={handleBorrarCaja} cajas={cajas} />} />
                                <Route path="/lista-cajas" element={<ListaDeCajas cajas={cajas} onBorrarCaja={handleBorrarCaja} />} />
                                <Route path="/informacion-empresa" element={<InformacionEmpresa />} />
                                <Route path="/resetear-turnos" element={<ResetearTurnos />} />
                                <Route path="/solicitar-turno" element={<SolicitarTurno cajas={cajas} onSolicitarTurno={solicitarTurno} listaTurnos={listaTurnos} />} />
                                <Route path="/visualizador-turnos" element={<TurnViewer turnos={listaTurnos} imagen="url-de-tu-imagen-o-video" logo="url-de-tu-logo" />} />
                                <Route path="/" element={<Menu />} /> {/* Página de inicio, por ejemplo. */}
                            </Routes>
                        </Router>
                </div>
        </div>
    );
}

export default App;
