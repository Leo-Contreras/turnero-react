import React from 'react'
import {Container, Table} from "react-bootstrap";

const CajaIniciada = ({ listaTurnos, cajaAutenticada , onDelete }) => {
    const turnosDelModulo = cajaAutenticada ? listaTurnos.filter(turno => turno.Caja === cajaAutenticada.nombre) : [];

    const handleDelete = (turno) => {
        const confirmDelete = window.confirm(`Estás seguro que deseas eliminar el turno ${turno.Turno}?`);  // ventana de confirmación
        if (confirmDelete) {
            onDelete(turno);
        }
    };

    return (
        <Container style={{marginTop : '10%'}}>
            <h1>Inicio de Sesion exitoso</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Caja</th>
                    <th>Turno</th>
                    <th>Atendido</th>
                </tr>
                </thead>
                <tbody>
                {turnosDelModulo.map((turno, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{turno.Caja}</td>
                        <td>{turno.Turno}</td>
                        <td>{turno.Asignado ? 'Si' : 'No'}</td>
                        <td>
                            <button onClick={() => handleDelete(turno)}>Eliminar</button> {/* Botón agregado */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default CajaIniciada
