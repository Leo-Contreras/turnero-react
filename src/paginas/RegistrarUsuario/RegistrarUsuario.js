import React, { useState } from 'react';
import { Alert, Card, Form, Button, Container, Modal } from 'react-bootstrap';

const RegistrarUsuario = ({ onRegistrarUsuario, usuarios, modulos }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [rolUsuario, setRolUsuario] = useState('Funcionario');  // Default a 'Funcionario'
    const [assignedModule, setAssignedModule] = useState(''); // Nuevo estado para el módulo asignado
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Nuevo estado para el diálogo de confirmación

    const handleInputChange = (event) => {
        if (event.target.name === 'nombre') {
            setNombreUsuario(event.target.value);
        } else if (event.target.name === 'rol') {
            setRolUsuario(event.target.value);
        } else if (event.target.name === 'modulo') {
            setAssignedModule(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowConfirmDialog(true); // Muestra el diálogo de confirmación en lugar de registrar al usuario de inmediato
    };

    const handleConfirm = (event) => {
        event.preventDefault();

        // Verificar si el nombre del usuario ya existe
        const usuarioExistente = usuarios.find((usuario) => usuario.nombre === nombreUsuario);
        if (usuarioExistente) {
            alert('El nombre de usuario ya está registrado. Por favor, elija otro nombre.');
            return;
        }

        // Crear el nuevo usuario
        onRegistrarUsuario({ nombre: nombreUsuario, rol: rolUsuario, modulo: assignedModule });
        setNombreUsuario('');
        setRolUsuario('Funcionario');  // Reset a 'Funcionario'
        setAssignedModule('');  // Reset a módulo vacío
        setShowAlert(true);
        setShowConfirmDialog(false);
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
                        <Form.Group>
                            <Form.Label>Módulo asignado</Form.Label>
                            <Form.Control
                                as="select"
                                name="modulo"
                                value={assignedModule}
                                onChange={handleInputChange}
                            >
                                {modulos.map(modulo => <option key={modulo.id} value={modulo.id}>{modulo.nombre}</option>)}
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

            {/* Modal de confirmación */}
            <Modal show={showConfirmDialog} onHide={() => setShowConfirmDialog(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Registro de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nombre: {nombreUsuario}</p>
                    <p>Rol: {rolUsuario}</p>
                    <p>Módulo: {assignedModule}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDialog(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegistrarUsuario;
