import React, {useEffect , useState} from 'react';
import {Button, Container, Table} from 'react-bootstrap';
import {API_URL_TURNERO, ESTADO_EN_PROCESO, ESTADO_PENDIENTE, ESTADO_TERMINADO} from "../../ENV/constantes";
import Papa from 'papaparse';

const CajaIniciada = ({ cajaAutenticada, abrirTurno, cerrarTurno }) => {

    const [listaTurnos, setTurnos] = useState([]);

    useEffect(() => {
        console.log(cajaAutenticada.nombre)
        fetch(API_URL_TURNERO + "turnos/" + cajaAutenticada.nombre)
            .then(response => response.json())
            .then(data => setTurnos(data))
            .catch(error => console.error('Error:', error));
    }, [cajaAutenticada.nombre]);

    const turnosDelModulo = cajaAutenticada ? listaTurnos.filter(turno => turno.modulo === cajaAutenticada.nombre) : [];
    const turnosPendientes = turnosDelModulo.filter(turno => turno.estado === ESTADO_PENDIENTE);
    const turnosRealizados = turnosDelModulo.filter(turno => turno.estado === ESTADO_TERMINADO);
    const turnosAbiertos = turnosDelModulo.filter(turno => turno.estado === ESTADO_EN_PROCESO);
    const turnosMostrados = [...turnosAbiertos, ...turnosPendientes];
    const handleAbrirTurno = (turno) => {
        abrirTurno(turno);
    };

    const handleCerrarTurno = (turno) => {
        cerrarTurno(turno);
    };

    const exportarCSV = () => {
        const fields = ['Modulo', 'Turno', 'Estado', 'TiempoInicio', 'TiempoFin', 'Duracion'];

        const turnosFormateados = listaTurnos.map(turno => {
            const inicio = new Date(turno.tiempo_inicio);
            const fin = new Date(turno.tiempo_fin);
            const duracion = Math.abs(fin - inicio);

            return {
                ...turno,
                TiempoInicio: inicio.toLocaleString(),
                TiempoFin: fin.toLocaleString(),
                Duracion: Math.floor(duracion / (1000 * 60)) + ' mins'
            };
        });

        const csv = Papa.unparse({
            fields: fields,
            data: turnosFormateados
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'lista_turnos.csv';
        link.click();
    };

    return (
        <Container className="mt-5" style={{ marginTop: '10%' }}>
            <h1 className="mb-4" >Lista de turnos Pendiente en el Módulo <strong>{cajaAutenticada.nombre}</strong></h1>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Turno</th>
                    <th>Atendido</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {turnosMostrados.map((turn, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{turn.turno}</td>
                        <td>{turn.estado}</td>
                        <td>
                            {turn.estado === ESTADO_PENDIENTE ? (
                                <>
                                    <button onClick={() => handleAbrirTurno(turn)}>Tomar Turno</button>
                                </>
                            ) : (
                                <button onClick={() => handleCerrarTurno(turn)}>Finalizar Turno</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <h2 className="mb-2">Turnos Realizados</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Turno</th>
                    <th>Tiempo de Inicio</th>
                    <th>Tiempo de Finalización</th>
                </tr>
                </thead>
                <tbody>
                {turnosRealizados.map((turn, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{turn.turno}</td>
                        <td>{new Date(turn.tiempo_inicio).toLocaleString()}</td>
                        <td>{new Date(turn.tiempo_fin).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>

            </Table>
            <Button variant="primary" onClick={exportarCSV} type="submit" block style={{marginTop: '20px', backgroundColor: 'maroon', borderColor: 'gray'}}>
                Exportar CSV
            </Button>

        </Container>
    );
};

export default CajaIniciada;

