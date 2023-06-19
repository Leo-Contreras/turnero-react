import React, { useState } from 'react';
import { Alert, Card, Form, Button } from 'react-bootstrap';
import ListaDeCajas from "../Lista de cajas/ListaDeCajas";

const RegistrarCaja = ({ cajas, onRegistrarCaja, onDeleteCaja }) => {

  const [cajaNombre, setCajaNombre] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    setCajaNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegistrarCaja(cajaNombre);
    setCajaNombre(''); // Reinicia el valor del input después del registro
    setShowAlert(true); // Muestra la alerta
  };

  return (
      <div>
        <Card style={{ width: '18rem', height: '24rem', margin: 'auto', marginTop: '10%' }}>
          <Card.Body>
            <Card.Title className="text-center">Registrar Modulo</Card.Title>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                  Se registró correctamente el módulo: <strong>{cajaNombre}</strong>
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre del Modulo</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del modulo."
                    value={cajaNombre}
                    onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Registrar
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <ListaDeCajas cajas={cajas} onDeleteCaja={onDeleteCaja} />
      </div>
  );
};

export default RegistrarCaja;

