import {Table, Row, Col, Container} from 'react-bootstrap';
import './TurnViewer.scss'
import Image from '../../assets/logo adbc.png';
import Fondo from '../../assets/fondo_blanco_gris.jpeg';
import Video from '../../assets/Constancia_Antecedentes_Penales.mp4';

const TurnViewer = ({ turnos }) => {
    return (

            <Container className="turnViewer" style={{marginTop: '5%'}}>
                <Col>
                        <Row className="align-items-center bg-dark text-white p-3 mb-3" style={{border: '1px solid white'}}>
                            <Col className="text-center">
                                <Row>
                                    <h2>Turno</h2>
                                </Row>
                                <Row >
                                  <h1 style={{color : 'red', fontSize: '90px'}}> {turnos[0]?.Turno}</h1>
                                </Row>
                            </Col>
                            <Col className="text-center">
                                <Row>
                                    <h2>Caja</h2>
                                </Row>
                                <Row>
                                    <h1 style={{color : 'red' ,  fontSize: '60px'}}>{turnos[0]?.Caja}</h1>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8} className="mb-3 bg-white">
                                <div style={{
                                    backgroundImage: `url(${Fondo})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: '',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <Row>
                                        <img src={Image} alt="Logo adbc" className="img-fluid" />
                                    </Row>
                                    <Row>
                                        <video controls src={Video} width="100%" height="auto"/>
                                    </Row>

                                </div>
                            </Col>
                            <Col md={4}>
                                <div style={{
                                    backgroundImage: `url(${Fondo})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: '',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                    <Table style={{
                                        backgroundImage: `url(${Fondo})`,
                                    }}
                                        className="transparent-table">
                                        <thead>
                                        <tr>
                                            <th>Turno</th>
                                            <th>Caja</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {turnos.slice(1).map((turno, index) => (
                                            <tr key={index}>
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
