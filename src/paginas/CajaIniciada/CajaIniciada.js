import React from 'react'
import {Container, Table} from "react-bootstrap";
import { CSVLink } from "react-csv"; // Importar CSVLink de react-csv
const CajaIniciada = ({ listaTurnos, cajaAutenticada, onFinalizar, onAtender }) => {

    const turnosDelModulo = cajaAutenticada ? listaTurnos.filter(turno => turno.Caja === cajaAutenticada.nombre) : [];
    const turnosPendientes = turnosDelModulo.filter(turno => turno.Estado !== 'FINALIZADO' && turno.Estado !== 'CANCELADO');
    const handleDelete = (turno) => {
        const confirmDelete = window.confirm(`Estás seguro que deseas Terminar el turno ${turno.Turno}?`);  // ventana de confirmación
        if (confirmDelete) {
            onFinalizar(turno);
        }
    };
    const handleAtender = (turno) => {
        onAtender(turno);
    };

    const dataParaExportar = turnosDelModulo.map(turno => {
        const nuevoTurno = { ...turno };
        const tiempoComoNumero = parseFloat(turno.tuCampoDeTiempo);

        if (!isNaN(tiempoComoNumero)) {
            // Convertir microsegundos a milisegundos
            const tiempoEnMilisegundos = tiempoComoNumero / 1000;
            const fecha = new Date(tiempoEnMilisegundos);
            nuevoTurno.tuCampoDeTiempo = fecha.toLocaleString();
        }

        return nuevoTurno;
    });

    return (
        <Container style={{ marginTop: '10%' }}>
            <h1>Lista de turnos Modulo: {cajaAutenticada.nombre}</h1>
            <Table striped bordered hover variant="light">
                <thead style={{ backgroundColor: '#6a1232', color: 'white' }}>
                <tr>
                    <th>#</th>
                    <th>Turno</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {turnosPendientes.map((turno, index) => (
                    <tr key={turno.id}>
                        <td>{index + 1}</td>
                        <td>{turno.Turno}</td>
                        <td>{turno.Estado}</td>
                        <td>
                            {turno.Estado === 'ATENDIENDO' ? (
                                <button onClick={() => handleDelete(turno)}>Terminar</button>
                            ) : (
                                <button onClick={() => handleAtender(turno)}>Atender</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <h2>Turnos Finalizados</h2>
            <Table striped bordered hover variant="light">
                <thead style={{ backgroundColor: '#6a1232', color: 'white' }}>
                <tr>
                    <th>#</th>
                    <th>Turno</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {turnosDelModulo
                    .filter(turno => turno.Estado === 'FINALIZADO' || turno.Estado === 'CANCELADO')
                    .map((turno, index) => (
                        <tr key={turno.id}>
                            <td>{index + 1}</td>
                            <td>{turno.Turno}</td>
                            <td>{turno.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                <CSVLink
                    data={dataParaExportar}
                    filename={"Lista_turnos.csv"}
                    className="btn btn-success"
                    target="_blank"
                    style={{ marginLeft: '1rem' }}>
                    <i className="fas fa-file-excel"></i> Exportar CSV
                </CSVLink>
        </Container>
    );
};
export default CajaIniciada;
