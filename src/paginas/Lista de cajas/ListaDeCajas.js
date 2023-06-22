import React from 'react';
import {Card, Button, Table} from 'react-bootstrap';

const ListaDeCajas = ({ cajas = [], onBorrarCaja }) => {
    return (
        <Card style={{ width: '18rem', margin: 'auto', marginTop: '10%' }}>
            <Card.Body>
                <Card.Title className="text-center">Listado de Cajas Registradas</Card.Title>
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

            </Card.Body>
        </Card>
    );
};

export default ListaDeCajas;

