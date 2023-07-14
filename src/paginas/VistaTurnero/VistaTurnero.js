import React from 'react';
import logoADBC from '../../assets/Img/logo_BC_identidad_blanco@4x.png';
import logoCorazon from '../../assets/Img/logo corazonxdelante.png'
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

const cardStyle = {
    borderRadius: '16px',
    backgroundColor: '#6a1232',
    color: 'white',
};

const cardTextStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '20px',
    textAlign: 'center'
};

const pageStyle = {
    backgroundColor: '#3c3c3b',
    minHeight: '100vh', // Esto hace que la página tenga al menos la altura de la ventana del navegador
};

const VistaTurnero = ({ modulos }) => {

    return (
        <Container fluid style={pageStyle}>
            <Container>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
            <Row className="mb-4">
                <Col md={8}>
                    <Image src={logoADBC} fluid />
                </Col>
                <Col md={4}>
                    <Image src={logoCorazon} fluid />
                </Col>
            </Row>
            </Container>
            <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {modulos.map((modulo, index) => (
                    <Card style={cardStyle} className="mb-4" key={index}>
                        <Card.Header as="h5" style={cardTextStyle}>#{index}</Card.Header>
                        <Card.Body>
                            <Card.Text style={cardTextStyle}>
                                {modulo.turnoActual ? modulo.turnoActual.Turno : '/// '} --> {modulo.nombre}
                            </Card.Text>
                            {/* Aquí puedes añadir más detalles acerca de cada módulo */}
                        </Card.Body>
                    </Card>
                ))}
            </div>

        </Container>
    )
}

export default VistaTurnero;
