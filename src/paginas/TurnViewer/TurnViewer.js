import {Col, Container, Row, Table} from 'react-bootstrap';
import {useEffect} from "react";
import './TurnViewer.scss'
import Image from '../../assets/logo adbc.png';
import Fondo from '../../assets/fondo_blanco_gris.jpeg';
import LogoCorazon from '../../assets/logo corazonxdelante.png';
import cactus_fondo from '../../assets/cactus.jpg';


const TurnViewer = ({ turnos , turnoActual }) => {



    useEffect(() => {
        // Guarda el estilo de fondo actual del cuerpo
        const currentBackgroundImage = document.body.style.backgroundImage;

        // Establece el nuevo estilo de fondo
        document.body.style.backgroundImage = `url(${cactus_fondo})`;
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';


        // Cuando el componente se desmonta, restaura el estilo de fondo original
        return () => {
            document.body.style.backgroundImage = currentBackgroundImage;
        };
    }, []);  // El array vacío asegura que este efecto solo se ejecute una vez (al montar y desmontar)


    return (
        <>
            <Row>
                {/* Columna de 33% */}
                <Col className="p-3" md={4} style={{marginLeft: '3%'}}>
                    {/* Primer renglón (30%) */}
                    <Row className="align-items-center bg-dark text-white p-3 mb-3" style={{border: '1px solid white', height: '30%'}}>
                        <Col className="text-center">
                            <Row>
                                <h2>Turno</h2>
                            </Row>
                            <Row>
                                <h1 style={{color : 'red', fontSize: '90px'}}>
                                    {turnoActual ? turnoActual.Turno.toString().padStart(3, '0') : '---'}
                                </h1>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <Row>
                                <h2>Modulo</h2>
                            </Row>
                            <Row>
                                <h1 style={{color : 'red' ,  fontSize: '60px'}}>{turnoActual ? turnoActual.Caja : '---'}</h1>
                            </Row>
                        </Col>
                    </Row>
                    {/* Segundo renglón (70%) */}
                    <Row style={{height: '70%'}}>
                        <Table
                            className="transparent-table tabla-aumentada"
                            style={{ backgroundImage: `url(${Fondo})` }}
                        >
                            <thead>
                            <tr>
                                <th>Turno</th>
                                <th>Modulo</th>
                            </tr>
                            </thead>
                            <tbody>
                            {turnos.filter(turno => turno.Estado === "EN ESPERA").slice(0,8).map((turno, index) => (
                                <tr key={index} style={index === 0 ? {color: "#6a1232"} : {}}>
                                    <td>{turno.Turno.toString().padStart(3, '0')}</td>
                                    <td>{turno.Caja}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                {/* Columna de 66% */}
                <Col md={6}>
                    <Container>
                        <Col md={8} className="d-flex align-items-center justify-content-end">
                            <img src={Image} alt="Logo adbc" className="img-fluid m-2" style={{maxWidth: '100%', maxHeight: '100%'}} />
                            <img src={LogoCorazon} alt="Logo Corazon" className="img-fluid m-2" style={{maxWidth: '20%', maxHeight: '20%'}} />
                        </Col>
                    </Container>

                </Col>
            </Row>
        </>
    );

};

export default TurnViewer;
