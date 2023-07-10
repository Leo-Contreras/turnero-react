import React from 'react';
import {Card, Button, Table} from 'react-bootstrap';
import {CSVLink} from "react-csv";

const ListaDeCajas = ({ cajas, onBorrarCaja , ListaTurnos}) => {
    // Mapeamos la lista de turnos para ajustar las fechas antes de pasarlos a CSVLink
    const adjustedTurnos = ListaTurnos.map(turno => {
        const turnoCopy = {...turno};
        // Convierte los timestamps de Firestore a fechas legibles
        turnoCopy.TiempoInicio = new Date(turnoCopy.TiempoInicio * 1000).toLocaleString();
        turnoCopy.TiempoFin = new Date(turnoCopy.TiempoFin * 1000).toLocaleString();
        return turnoCopy;
    });
    return (
        <Card style={{ width: '18rem', margin: 'auto', marginTop: '10%' }}>
            <Card.Body>
                <Card.Title className="text-center">Listado de Modulos Registrados</Card.Title>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del Módulo</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cajas.map((caja, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{caja.nombre}</td>
                            <td>
                                <Button variant="danger" onClick={() => onBorrarCaja(caja.nombre)}>
                                    Borrar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <CSVLink
                    data={adjustedTurnos}  // Pasamos los datos ajustados a CSVLink
                    filename={"Lista_turnos_completo.csv"}
                    className="btn btn-success"
                    target="_blank"
                    style={{ marginLeft: '1rem' }}>
                    <i className="fas fa-file-excel"></i> Exportar CSV Lista de Turnos
                </CSVLink>
            </Card.Body>
        </Card>
    );
};

export default ListaDeCajas;

