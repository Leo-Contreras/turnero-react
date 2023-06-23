import React from 'react';
import { Container, Table } from 'react-bootstrap';
import {ESTADO_EN_PROCESO, ESTADO_PENDIENTE, ESTADO_TERMINADO} from "../../ENV/constantes";
import Papa from 'papaparse';




const CajaIniciada = ({ listaTurnos, cajaAutenticada, abrirTurno, cerrarTurno }) => {

    const turnosDelModulo = cajaAutenticada ? listaTurnos.filter(turno => turno.Caja === cajaAutenticada.nombre) : [];
    const turnosPendientes = turnosDelModulo.filter(turno => turno.Estado === ESTADO_PENDIENTE);
    const turnosRealizados = turnosDelModulo.filter(turno => turno.Estado === ESTADO_TERMINADO);
    const turnosAbiertos = turnosDelModulo.filter(turno => turno.Estado === ESTADO_EN_PROCESO);
    const turnosMostrados = [...turnosAbiertos, ...turnosPendientes];
    const handleAbrirTurno = (turno) => {
        abrirTurno(turno);
    };

    const handleCerrarTurno = (turno) => {
        cerrarTurno(turno);
    };


    const exportarCSV = () => {
        const fields = ['Caja', 'Turno', 'Estado', 'TiempoInicio', 'TiempoFin', 'Duracion'];

        const turnosFormateados = listaTurnos.map(turno => {
            const inicio = new Date(turno.TiempoInicio);
            const fin = new Date(turno.TiempoFin);
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
            <h1 className="mb-4" >Lista de turnos Módulo: {cajaAutenticada.nombre}</h1>
            <h2 className="mb-2" >Turnos Pendientes</h2>
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
                {turnosMostrados.map((turno, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{turno.Turno}</td>
                        <td>{turno.Estado}</td>
                        <td>
                            {turno.Estado === ESTADO_PENDIENTE ? (
                                <>
                                    <button onClick={() => handleAbrirTurno(turno)}>Abrir</button>
                                </>
                            ) : (
                                <button onClick={() => handleCerrarTurno(turno)}>Cerrar</button>
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
                {turnosRealizados.map((turno, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{turno.Turno}</td>
                        <td>{new Date(turno.TiempoInicio).toLocaleString()}</td>
                        <td>{new Date(turno.TiempoFin).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>

            </Table>

            <button onClick={exportarCSV}>Exportar CSV</button>


        </Container>
    );
};

export default CajaIniciada;

