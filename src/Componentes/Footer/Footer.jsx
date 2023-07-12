import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LogoADBC from '../../assets/Img/logo_BC_identidad_blanco@4x.png'

const Footer = () => {
	return (
		<footer style={{ backgroundColor: '#6a1232', color: 'white', padding: '20px 0' }}>
			<Container>
				<Row>
					<Col md={6}>
						<img src={LogoADBC} alt="Logo ADBC" style={{ maxWidth: '100%' }}/>
					</Col>
					<Col md={6}>
						<p>Sistema Turnero</p>
						<p>Diseñado y operado por la Agencia Digital del Estado de Baja California</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
