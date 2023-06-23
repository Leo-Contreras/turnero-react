import React, { useState } from 'react';
import {Form, Button, Container, Card} from 'react-bootstrap';
import CajaIniciada from "../CajaIniciada/CajaIniciada";



const Login = ({ onLogout, onLogin, estaAutenticado, cajaAutenticada, listaTurnos , onDelete , abrirTurno , cerrarTurno}) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(nombre, password);
  };

  if (estaAutenticado) {
    return (
        <Container className="align-items-center">
          <CajaIniciada
              listaTurnos={listaTurnos}
              cajaAutenticada={cajaAutenticada}
              onDelete={onDelete}
              abrirTurno={abrirTurno}
              cerrarTurno={cerrarTurno}
          />
          <Button variant="danger" onClick={onLogout} style={{marginTop: '20px'}}>Cerrar Sesión</Button> {/* Asegúrate de que onLogout esté definido y maneje la acción de cierre de sesión */}
        </Container>
    ); // Asegúrate de pasar los props necesarios a CajaIniciada
  }


  return (
      <div>
        <Card style={{ width: '18rem', height: '16rem', margin: 'auto', marginTop: '10%' }}>
          <Card.Body>
            <Card.Title className="text-center">Iniciar Sesión</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre del Módulo</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre del modulo" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña del Módulo</Form.Label>
                <Form.Control type="password" placeholder="Ingrese la contraseña del modulo" value={password} onChange={e => setPassword(e.target.value)} required />
              </Form.Group>
              <Container className="align-items-center">
                <Button variant="primary" type="submit" block style={{marginTop: '20px', backgroundColor: 'maroon', borderColor: 'gray'}}>
                  Iniciar Sesión
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </div>
  );
};
export default Login;
