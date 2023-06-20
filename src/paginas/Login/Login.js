import React, { useState } from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import CajaIniciada from "../CajaIniciada/CajaIniciada";


const Login = ({ onLogin, estaAutenticado, cajaAutenticada, listaTurnos }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(nombre, password);
  };

  if (estaAutenticado) {
    return <CajaIniciada  listaTurnos={listaTurnos} cajaAutenticada={cajaAutenticada}/> // Asegúrate de pasar los props necesarios a CajaIniciada
  }

  return (
      <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre de la caja" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">Iniciar sesión</Button>
      </Form>
      </Container>
  );
};

export default Login;
