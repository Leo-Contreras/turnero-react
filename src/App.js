import React, {useEffect, useState} from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc , onSnapshot } from "firebase/firestore";
import { firestore } from "./Componentes/Firebase/firebaseConfig"
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




function App() {

    const [listaTurnos, setListaTurnos] = useState([
        { Caja: "MODULO 1", Turno: 1 },
        { Caja: "MODULO 2", Turno: 2 },
        { Caja: "MODULO 1", Turno: 3 },
        { Caja: "MODULO 2", Turno: 4 },
        { Caja: "MODULO 1", Turno: 5 },
    ]);

    const [cajas, setCajas] = useState([
        { nombre: "MODULO 1", password: "password1" },
        { nombre: "MODULO 2", password: "password2" },
        { nombre: "ADBC", password: "password3" },
    ]);

    const [cajaAutenticada, setCajaAutenticada] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);


    useEffect(() => {
        const fetchCajas = async () => {
            const cajasCollection = await getDocs(collection(firestore, 'cajas'));
            setCajas(cajasCollection.docs.map(doc => doc.data()));
        };

        const fetchTurnos = async () => {
            const turnosCollection = await getDocs(collection(firestore, 'turnos'));
            setListaTurnos(turnosCollection.docs.map(doc => doc.data()));
        };

        fetchCajas();
        fetchTurnos();
    }, []);

    useEffect(() => {
        const cajasRef = collection(firestore, 'cajas');
        const unsubscribe = onSnapshot(cajasRef, (snapshot) => {
            let cajas = [];
            snapshot.forEach((doc) => {
                cajas.push(doc.data());
            });
            setCajas(cajas);
        });

        // Remember to unsubscribe from your realtime listener on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const turnosRef = collection(firestore, 'turnos');
        const unsubscribe = onSnapshot(turnosRef, (snapshot) => {
            let turnos = [];
            snapshot.forEach((doc) => {
                turnos.push(doc.data());
            });
            setListaTurnos(turnos);
        });

        // Remember to unsubscribe from your realtime listener on unmount
        return () => unsubscribe();
    }, []);




    const handleRegistrarCaja = async (caja) => {
        setCajas(prevCajas => [...prevCajas, caja]);

        try {
            await setDoc(doc(collection(firestore, 'cajas'), caja.nombre), caja);
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };



    const handleDeleteTurno = async (turno) => {
        setListaTurnos((prevTurnos) => prevTurnos.filter((t) => t.id !== turno.id));

        try {
            await deleteDoc(doc(collection(firestore, 'turnos'), turno.id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };


    const handleBorrarCaja = async (cajaNombre) => {
        if (window.confirm(`¿Estás seguro de que quieres borrar el módulo ${cajaNombre} y todos sus turnos?`)) {
            // Primero, eliminar el módulo.
            setCajas(prevCajas => prevCajas.filter(caja => caja.nombre !== cajaNombre));

            try {
                await deleteDoc(doc(collection(firestore, 'cajas'), cajaNombre));
            } catch (error) {
                console.error("Error deleting document: ", error);
            }

            // Segundo, obtener todos los turnos para este módulo.
            const turnosDelModulo = listaTurnos.filter(turno => turno.Caja === cajaNombre);

            // Tercero, eliminar todos los turnos para este módulo.
            turnosDelModulo.forEach(async (turno) => {
                setListaTurnos(prevTurnos => prevTurnos.filter(t => t.id !== turno.id));

                try {
                    await deleteDoc(doc(collection(firestore, 'turnos'), turno.id));
                } catch (error) {
                    console.error("Error deleting document: ", error);
                }
            });
        }
    };




    const solicitarTurno = async (caja_nombre) => {
        const id = Date.now().toString();
        const newTurno = { id, Caja: caja_nombre, Turno: listaTurnos.length + 1 };
        setListaTurnos(prevTurnos => [...prevTurnos, newTurno]);

        try {
            await setDoc(doc(collection(firestore, 'turnos'), id), newTurno);
        } catch (error) {
            console.error("Error writing document: ", error);
        }
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
                                <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout} estaAutenticado={estaAutenticado} cajaAutenticada={cajaAutenticada} listaTurnos={listaTurnos} onDelete={handleDeleteTurno}/>} />
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
