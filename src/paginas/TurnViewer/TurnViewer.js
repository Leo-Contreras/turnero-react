import {Table, Row, Col, Container} from 'react-bootstrap';
import './TurnViewer.scss'
import Image from '../../assets/logo adbc.png';
import Fondo from '../../assets/fondo_blanco_gris.jpeg';
import Video from '../../assets/Constancia_Antecedentes_Penales.mp4';
import LogoCorazon from '../../assets/logo corazonxdelante.png';
import {useEffect} from "react";

const TurnViewer = ({ turnos , turnoActual }) => {
    // Al montar y desmontar el componente, cambia el color de fondo del body
    useEffect(() => {
        const originalBackgroundColor = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#6a1232';
        return () => {
            document.body.style.backgroundColor = originalBackgroundColor;
        };
    }, [turnoActual]);



    return (

            <Container className="turnViewer" style={{marginTop: '0%'}}>
                <Col>
                        <Row className="align-items-center bg-dark text-white p-3 mb-3" style={{border: '1px solid white'}}>
                            <Col className="text-center">
                                <Row>
                                    <h2>Turno</h2>
                                </Row>
                                <Row >
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

                        <Row>
                            <Col md={8} className="mb-3" style={{
                                backgroundImage: `url(${Fondo})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '640px',  // Añade el ancho
                                height: '472px'  // Añade la altura
                            }}>
                                    <Row>
                                        <Container>
                                            <Col lg={8} md={8}>
                                                <img src={Image} alt="Logo adbc" className="img-fluid" style={{maxWidth: '80%', maxHeight: '80%'}} />
                                            </Col>
                                            <Col lg={4} md={4}>
                                                <img src={LogoCorazon} alt="Logo adbc" className="img-fluid" style={{maxWidth: '60%', maxHeight: '60%'}} />
                                            </Col>
                                        </Container>

                                    </Row>
                                    <Row>
                                        <video controls src={Video} width="70%" height="auto"/>
                                    </Row>
                            </Col>
                            <Col md={4}>
                                <div style={{
                                    backgroundImage: `url(${Fondo})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    width: '310px',  // Añade el ancho
                                    height: '472px'  // Añade la altura
                                }}>
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

                                </div>
                            </Col>
                        </Row>
                        <Row className="bg-gold p-3">
                            <Col>

                            </Col>
                        </Row>
                </Col>
            </Container>


    );
};

export default TurnViewer;
