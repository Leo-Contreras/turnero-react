import React, { useState } from 'react';
import { Alert, Card, Form, Button, Container } from 'react-bootstrap';

const RegistrarUsuario = ({ onRegistrarUsuario, usuarios }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [rolUsuario, setRolUsuario] = useState('Funcionario');  // Default a 'Funcionario'
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        if (event.target.name === 'nombre') {
            setNombreUsuario(event.target.value);
        } else if (event.target.name === 'rol') {
            setRolUsuario(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si el nombre del usuario ya existe
        const usuarioExistente = usuarios.find((usuario) => usuario.nombre === nombreUsuario);
        if (usuarioExistente) {
            alert('El nombre de usuario ya está registrado. Por favor, elija otro nombre.');
            return;
        }

        onRegistrarUsuario({ nombre: nombreUsuario, rol: rolUsuario });
        setNombreUsuario('');
        setRolUsuario('Funcionario');  // Reset a 'Funcionario'
        setShowAlert(true);
    };

    return (
        <div>
            <Card style={{ width: '18rem', height: '24rem', margin: 'auto', marginTop: '10%' }}>
                <Card.Body>
                    <Card.Title className="text-center">Registrar Usuario</Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre del Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Ingrese el nombre del usuario."
                                value={nombreUsuario}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Rol del Usuario</Form.Label>
                            <Form.Control
                                as="select"
                                name="rol"
                                value={rolUsuario}
                                onChange={handleInputChange}
                            >
                                <option value="Funcionario">Funcionario</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Control>
                        </Form.Group>
                        <Container className="align-items-center">
                            <Button variant="primary" type="submit" block style={{marginTop: '20px',marginBottom:'5%', backgroundColor: 'maroon', borderColor: 'gray'}}>
                                Registrar
                            </Button>

                            {showAlert && (
                                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                                    Usuario registrado correctamente.
                                </Alert>
                            )}
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RegistrarUsuario;
