import React, { useState } from 'react';
import {Alert, Card, Form, Button, Container} from 'react-bootstrap';

const RegistrarCaja = ({  onRegistrarCaja  }) => {
  const [cajaNombre, setCajaNombre] = useState('');
  const [cajaPassword, setCajaPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.name === 'nombre') {
      setCajaNombre(event.target.value);
    } else if (event.target.name === 'password') {
      setCajaPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegistrarCaja({ nombre: cajaNombre, password: cajaPassword });
    setCajaNombre(''); // Reinicia el valor del input después del registro
    setCajaPassword(''); // Reinicia el valor del input después del registro
    setShowAlert(true); // Muestra la alerta
  };

  return (
      <div>
        <Card style={{ width: '18rem', height: '24rem', margin: 'auto', marginTop: '10%' }}>
          <Card.Body>
            <Card.Title className="text-center">Registrar Modulo</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre del Modulo</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Ingrese el nombre del modulo."
                    value={cajaNombre}
                    onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña del Modulo</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ingrese la contraseña del modulo."
                    value={cajaPassword}
                    onChange={handleInputChange}
                />
              </Form.Group>
              <Container className="align-items-center">
                <Button variant="primary" type="submit" block style={{marginTop: '20px',marginBottom:'5%', backgroundColor: 'maroon', borderColor: 'gray'}}>
                  Registrar
                </Button>

                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                      Modulo registrado correctamente.
                    </Alert>
                )}
              </Container>
            </Form>
          </Card.Body>
        </Card>

      </div>
  );
};

export default RegistrarCaja;

