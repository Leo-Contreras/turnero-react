import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';


const ListaDeCajas = ({ cajas = [], onBorrarCaja }) => { // Si cajas es undefined, se inicializa como un array vacío
    return (

        <Card style={{ width: '18rem', margin: 'auto', marginTop: '10%' }}>
            <Card.Body>
                <Card.Title className="text-center">Listado de Cajas Registradas</Card.Title>
                <ListGroup>
                    {cajas.map((caja, index) => (
                        <ListGroup.Item key={index}>
                            {caja}
                            <Button variant="danger" onClick={() => onBorrarCaja(caja)}>Borrar</Button>

                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </Card.Body>
        </Card>
    );
};

export default ListaDeCajas;
