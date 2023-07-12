import React, { useState, useEffect } from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import './TurnViewer.scss'
import Image from '../../assets/logo adbc.png';
import Fondo from '../../assets/fondo_blanco_gris.jpeg';
import LogoCorazon from '../../assets/logo corazonxdelante.png';
import cactus_fondo from '../../assets/cactus.jpg';

const TurnViewer = ({ turnos , turnoActual }) => {

    const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('backgroundImage') || cactus_fondo);

    useEffect(() => {
        // Guarda el estilo de fondo actual del cuerpo
        const currentBackgroundImage = document.body.style.backgroundImage;

        // Establece el nuevo estilo de fondo
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';

        // Guarda la imagen seleccionada en el almacenamiento local
        localStorage.setItem('backgroundImage', backgroundImage);

        // Cuando el componente se desmonta, restaura el estilo de fondo original
        return () => {
            document.body.style.backgroundImage = currentBackgroundImage;
        };
    }, [backgroundImage]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBackgroundImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    // eslint-disable-next-line no-unused-vars
    const handleImageSelect = (e) => {
        setBackgroundImage(e.target.value);
    };

    return (
        <>
            <Row>
                {/* Columna de 33% */}
                <Col className="p-3" md={4} style={{marginLeft: '3%'}}>
                    {/* Primer renglón (30%) */}

                    <Row className="align-items-center bg-dark text-white p-3 mb-3" style={{border: '1px solid white', height: '30%'}}>
                        <Container>
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
                        </Container>

                    </Row>
                    {/* Segundo renglón (70%) */}
                    <Row style={{height: '70%'}}>
                        <Table
                            className="transparent-table tabla-aumentada"
                            style={{ backgroundImage: `url(${Fondo})` }}
                        >
                            <thead>
                            <tr>
                                <th className="text-center">Turno</th>
                                <th className="text-center">Modulo</th>
                            </tr>
                            </thead>
                            <tbody>
                            {turnos.filter(turno => turno.Estado === "EN ESPERA").slice(0,8).map((turno, index) => (
                                <tr key={index} style={index === 0 ? {color: "#6a1232"} : {}}>
                                    <td className="text-center">{turno.Turno.toString().padStart(3, '0')}</td>
                                    <td className="text-center">{turno.Caja}</td>
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
                            <img src={Image} alt="Logo adbc" className="img-fluid m-2" style={{maxWidth: '100%'}} />
                            <img src={LogoCorazon} alt="Logo Corazon" className="img-fluid m-2" style={{maxWidth: '20%'}} />
                        </Col>

                    </Container>

                </Col>
            </Row>
            <Row className="">
                <Container>
                    <input type="file" onChange={handleImageUpload} />
                    {/*  <select onChange={handleImageSelect}>
                        <option value={cactus_fondo}>Cactus</option>
                         Aquí puedes agregar tus otras dos imágenes predeterminadas
                    </select> */}
                </Container>

            </Row>
        </>
    );

};

export default TurnViewer;
