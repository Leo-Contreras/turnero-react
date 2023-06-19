import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './paginas/Login/Login';
import RegistroCaja from './paginas/RegistroCaja/RegistroCaja';
import InformacionEmpresa from './paginas/InformacionEmpresa/InformacionEmpresa';
import ResetearTurnos from './paginas/ResetearTurnos/ResetearTurnos';
import SolicitarTurno from './paginas/SolicitarTurno/SolicitarTurno';
import ListaDeCajas from "./paginas/Lista de cajas/ListaDeCajas";
import TurnViewer from "./paginas/TurnViewer/TurnViewer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./paginas/Menu/Menu";
import './custom.scss';


function App() {

    const [listaTurnos, setListaTurnos] = useState([
        { Caja: "CAJA 1", Turno: 1 },
        { Caja: "CAJA 2", Turno: 2 },
        { Caja: "CAJA 1", Turno: 3 },
        { Caja: "CAJA 2", Turno: 4 },
        { Caja: "CAJA 1", Turno: 5 },
        { Caja: "CAJA 2", Turno: 6 },
        { Caja: "CAJA 1", Turno: 7 },
        { Caja: "CAJA 2", Turno: 8 },
        { Caja: "CAJA 1", Turno: 9 },
        { Caja: "CAJA 2", Turno: 10 },
    ]);

    const [cajas, setCajas] = useState(["CAJA 1" , "CAJA 2" , "ADBC"]);

    const handleRegistrarCaja = (cajaNombre) => {
        setCajas([...cajas, cajaNombre]);
    };

    const handleBorrarCaja = (cajaNombre) => {
        setCajas((prevCajas) => prevCajas.filter((caja) => caja !== cajaNombre));
    };



    const solicitarTurno = (caja, codigo) => {
        setListaTurnos(oldTurnos => [...oldTurnos, { Caja: caja, Turno: oldTurnos.length + 1, Codigo: codigo }]);
    };


    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registrar-caja" element={<RegistroCaja onRegistrarCaja={handleRegistrarCaja} onBorrarCaja={handleBorrarCaja} cajas={cajas} />} />
                <Route path="/lista-cajas" element={<ListaDeCajas cajas={cajas} onBorrarCaja={handleBorrarCaja} />} />
                <Route path="/informacion-empresa" element={<InformacionEmpresa />} />
                <Route path="/resetear-turnos" element={<ResetearTurnos />} />
                <Route path="/solicitar-turno" element={<SolicitarTurno cajas={cajas} onSolicitarTurno={solicitarTurno} listaTurnos={listaTurnos} />} />
                <Route path="/visualizador-turnos" element={<TurnViewer turnos={listaTurnos} imagen="url-de-tu-imagen-o-video" logo="url-de-tu-logo" />} />
                <Route path="/" element={<Menu />} /> {/* Página de inicio, por ejemplo. */}
            </Routes>
        </Router>
    );
}

export default App;
