import React, {useEffect, useState} from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc , onSnapshot, updateDoc  } from "firebase/firestore";
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
import VistaTurnero from "./paginas/VistaTurnero/VistaTurnero";
import RegistrarUsuario from "./paginas/RegistrarUsuario/RegistrarUsuario";

function App() {

    const [listaTurnos, setListaTurnos] = useState([]);
    const [cajas, setCajas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [cajaAutenticada, setCajaAutenticada] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    const [turnoActual, setTurnoActual] = useState(null);  // Almacena el turno actual


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

    useEffect(() => {
        const turnoActualRef = doc(collection(firestore, 'turnoActual'), 'turnoActual');

        const unsubscribe = onSnapshot(turnoActualRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setTurnoActual(docSnapshot.data());
            }
        });

        // Recuerda des-suscribirte de tu observador en tiempo real al desmontar
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const usuariosCollection = await getDocs(collection(firestore, 'usuarios'));
            setUsuarios(usuariosCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchUsuarios();
    }, []);

    useEffect(() => {
        const usuariosRef = collection(firestore, 'usuarios');
        const unsubscribe = onSnapshot(usuariosRef, (snapshot) => {
            let usuarios = [];
            snapshot.forEach((doc) => {
                usuarios.push({ ...doc.data(), id: doc.id });
            });
            setUsuarios(usuarios);
        });
        // Recuerda desuscribirte del observador en tiempo real cuando se desmonte
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

    const handleRegistrarUsuario = async (usuario) => {
        const usuarioExistente = usuarios.find((usr) => usr.nombre === usuario.nombre);
        if (usuarioExistente) {
            alert('El nombre de usuario ya está registrado. Por favor, elija otro nombre.');
            return;
        }
        setUsuarios(prevUsuarios => [...prevUsuarios, usuario]);

        try {
            await setDoc(doc(collection(firestore, 'usuarios'), usuario.nombre), usuario);
        } catch (error) {
            console.error("Error escribiendo el documento: ", error);
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
        const newTurno = { id, Caja: caja_nombre, Turno: listaTurnos.length + 1, Estado: "EN ESPERA" ,TiempoFin: null , TiempoInicio: null};
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

    const calculateDuration = (startTime, endTime) => {
        const duration = endTime.getTime() - startTime.getTime();
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor(((duration % 3600000) % 60000) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };
    const handleAtenderTurno = async (turno, moduloActual) => {

        const startTime = new Date();

        try {
            const turnoRef = doc(collection(firestore, 'turnos'), turno.id);
            await updateDoc(turnoRef, { Estado: 'ATENDIENDO', TiempoInicio: startTime });
            // Crea una referencia al documento de la caja
            const moduloRef = doc(collection(firestore, 'cajas'), moduloActual.nombre);  // Asegúrate de tener disponible el nombre del moduloActual
            // Actualiza el turnoActual en el documento de la caja
            await updateDoc(moduloRef, { turnoActual: turno });
            // Establece el observador en el turno actual
            const unsubscribe = onSnapshot(turnoRef, (doc) => {
                if (doc.data().Estado === 'FINALIZADO') {
                    setTurnoActual(null);
                    unsubscribe();  // Deja de escuchar cambios en este turno
                } else {
                    setTurnoActual({ ...doc.data(), id: doc.id });  // Actualiza el turnoActual con los nuevos datos
                }
            });

        } catch (error) {
            console.error("Error al atender turno: ", error);
        }

        setListaTurnos((prevTurnos) => prevTurnos.map((t) => t.id === turno.id ? { ...t, Estado: 'ATENDIENDO', TiempoInicio: startTime } : t));
    };


    const handleFinalizarTurno = async (turno) => {
        const endTime = new Date();
        const startTime = new Date(turno.TiempoInicio);
        const duration = calculateDuration(startTime, endTime);
        try {
            const turnoRef = doc(collection(firestore, 'turnos'), turno.id);
            await updateDoc(turnoRef, { Estado: 'FINALIZADO', TiempoFin: endTime, Duracion: duration });

            // Aquí estamos actualizando también el turnoActual
            const turnoActualRef = doc(collection(firestore, 'turnoActual'), 'turnoActual');
            await updateDoc(turnoActualRef, { Estado: 'FINALIZADO', TiempoFin: endTime, Duracion: duration });

        } catch (error) {
            console.error("Error updating document: ", error);
        }
        setListaTurnos((prevTurnos) => prevTurnos.map((t) => t.id === turno.id ? { ...t, Estado: 'FINALIZADO', TiempoFin: endTime, Duracion: duration } : t));
    };

    const handleCancelarTurno = async (turno) => {
        try {
            const turnoRef = doc(collection(firestore, 'turnos'), turno.id);
            await updateDoc(turnoRef, { Estado: 'CANCELADO'});
        } catch (error) {
            console.error("Error al cancelar el turno: ", error);
        }
        setListaTurnos((prevTurnos) => prevTurnos.map((t) => t.id === turno.id ? { ...t, Estado: 'CANCELADO'} : t));
    };

    return (
        <div className="App">
                <div className="MainContent">
                        <Router>
                            <Routes>
                                <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout} estaAutenticado={estaAutenticado} cajaAutenticada={cajaAutenticada} listaTurnos={listaTurnos} onFinalizar={handleFinalizarTurno} onAtender={handleAtenderTurno} onCancelar={handleCancelarTurno}/>} />
                                <Route path="/registrar-caja" element={<RegistroCaja onRegistrarCaja={handleRegistrarCaja} cajas={cajas} />} />
                                <Route path="/lista-cajas" element={<ListaDeCajas cajas={cajas} onBorrarCaja={handleBorrarCaja} ListaTurnos={listaTurnos}/>} />
                                <Route path="/informacion-empresa" element={<InformacionEmpresa />} />
                                <Route path="/resetear-turnos" element={<ResetearTurnos />} />
                                <Route path="/solicitar-turno" element={<SolicitarTurno cajas={cajas} onSolicitarTurno={solicitarTurno} listaTurnos={listaTurnos} />} />
                                <Route path="/visualizador-turnos" element={<TurnViewer turnos={listaTurnos} turnoActual={turnoActual}/>} />
                                <Route path="/vista-turnero" element={<VistaTurnero modulos={cajas}/>} />
                                <Route path="/registrar-usuario" element={<RegistrarUsuario onRegistrarUsuario={handleRegistrarUsuario} usuarios={usuarios} modulos={cajas}/>} />

                                <Route path="/" element={<Menu />} />
                            </Routes>
                        </Router>
                </div>
        </div>
    );
}

export default App;
