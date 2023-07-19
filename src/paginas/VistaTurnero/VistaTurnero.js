import React from 'react';
import logoADBC from '../../assets/Img/logo_BC_identidad_blanco@4x.png';
import logoCorazon from '../../assets/Img/LOGOS corazón por delante Blanco-01-01.png'
import {Card, Col, Container, Image, Row} from 'react-bootstrap';

const cardStyle = {
    borderRadius: '16px',
    backgroundColor: '#9d3959', // Un tono más claro de '#6a1232' para los fondos de las tarjetas
    color: '#f0f0f0', // Un blanco ligeramente apagado para el texto
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' // Agrega un poco de sombra a las tarjetas para la profundidad
};

const cardDisabledStyle = {
    ...cardStyle, // Incluye todas las propiedades de cardStyle
    backgroundColor: '#6a1232', // Un tono más oscuro para los módulos sin turno actual
    color: '#aaa', // Un gris más apagado para el texto
};


const cardTextStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '20px',
    textAlign: 'center'
};

const pageStyle = {
    backgroundColor: '#6a1232', // El color principal para el fondo de la página
    minHeight: '100vh', // Esto hace que la página tenga al menos la altura de la ventana del navegador
};


function generarIdentificador(modulo) {
    // Obtener las primeras dos letras del nombre del módulo
    let letras = modulo.nombre.slice(0, 2).toUpperCase();

    // Formatear el número para que tenga tres dígitos
    let digitos = modulo.turnoActual.Turno.toString().padStart(3, '0');

    // Combinar las letras y los números para formar el identificador
    return letras + digitos;
}

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
                {modulos
                    .sort((a, b) => {
                        // Mueve los módulos con turnos actuales al inicio
                        if (a.turnoActual && !b.turnoActual) {
                            return -1;
                        }
                        if (!a.turnoActual && b.turnoActual) {
                            return 1;
                        }
                        // Ordena alfabéticamente si ambos tienen o no tienen turnos actuales
                        return a.nombre.localeCompare(b.nombre);
                    })
                    .map((modulo, index) => (
                        <Card style={modulo.turnoActual ? cardStyle : cardDisabledStyle} className="mb-4" key={index}>
                            <Card.Header as="h5" style={cardTextStyle}>{modulo.nombre}</Card.Header>
                            <Card.Body>
                                <Card.Text style={cardTextStyle}>
                                    { modulo.turnoActual ? ("Atendiendo: " + generarIdentificador(modulo)) : 'SIN ATENCIÓN' }
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
