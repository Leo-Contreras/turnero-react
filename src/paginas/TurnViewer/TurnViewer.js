import {Table, Row, Col, Container} from 'react-bootstrap';
import './TurnViewer.scss'
import Image from '../../assets/logo adbc.png';

const TurnViewer = ({ turnos}) => {
    return (

            <Container className="turnViewer" style={{marginTop: '5%'}}>
                <Col>

                        <Row className="align-items-center bg-dark text-white p-3 mb-3" style={{border: '1px solid white'}}>
                            <Col className="text-center">
                                <Row>
                                    <h2>Turno</h2>
                                </Row>
                                <Row >
                                  <h1 style={{color : 'red'}}> {turnos[0]?.Turno}</h1>
                                </Row>
                            </Col>
                            <Col className="text-center">
                                <Row>
                                    <h2>Caja</h2>
                                </Row>
                                <Row>
                                    <h1 style={{color : 'red'}}>{turnos[0]?.Caja}</h1>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={8} className="mb-3 bg-white">
                                <img src={Image} alt="Imagen o Video" className="img-fluid" />
                            </Col>
                            <Col md={4}>
                                <div className="turnInfo bg-white">
                                    <Table className="table-dark" >
                                        <thead>
                                        <tr>
                                            <th>Turno</th>
                                            <th>Caja</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {turnos.slice(1).map((turno, index) => (
                                            <tr key={index}>
                                                <td>{turno.Turno}</td>
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
