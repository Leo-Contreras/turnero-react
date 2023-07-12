import React, {useState, useEffect, useCallback} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import './TurnViewer.scss'
import Image from '../../assets/Img/logo adbc.png';
import Fondo from '../../assets/Img/fondo_blanco_gris.jpeg';
import LogoCorazon from '../../assets/Img/logo corazonxdelante.png';
import cactus_fondo from '../../assets/Img/cactus.jpg';
import NotificacionSound from '../../assets/audio/mixkit-software-interface-back-2575.wav';

const TurnViewer = ({ turnos , turnoActual }) => {

    const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem('backgroundImage') || cactus_fondo);

    const playNotificationSound = useCallback(() => {
        const notificacion = new Audio(NotificacionSound);
        notificacion.play();
    }, []);

    const [soundEnabled, setSoundEnabled] = useState(false);

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
    };

    useEffect(() => {
        if (soundEnabled && turnoActual) {
            playNotificationSound();
        }
    }, [turnoActual, soundEnabled, playNotificationSound]);


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
        if(e.target.files.length === 0) return; // Esta línea se asegura de que hay un archivo seleccionado.

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

                    <Row className="align-items-center custom-bg-dark text-white p-3 mb-3" style={{border: '5px solid #b17a45', minHeight: '40%'}}>
                        <Container>
                            <Col className="text-center">
                                <Row>
                                    <h2>TURNO</h2>
                                </Row>
                                <Row>
                                    <h1 style={{color : 'white', fontSize: '90px'}}>
                                        {turnoActual ? turnoActual.Turno.toString().padStart(3, '0') : '---'}
                                    </h1>
                                </Row>
                            </Col>
                            <Col className="text-center">
                                <Row>
                                    <h2>MODULO</h2>
                                </Row>
                                <Row>
                                    <h1 style={{color : 'white' ,  fontSize: '60px'}}>{turnoActual ? turnoActual.Caja : '---'}</h1>
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
                                <th className="text-center">TURNO</th>
                                <th className="text-center">MODULO</th>
                            </tr>
                            </thead>
                            <tbody>
                            {turnos.filter(turno => turno.Estado === "EN ESPERA").slice(0,15).map((turno, index) => (
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
                <Col md={7}>
                    <Container>
                        <Col md={6} className="d-flex align-items-center justify-content-end">
                            <img src={Image} alt="Logo Agencia Digital" className="img-fluid" style={{maxWidth: '100%'}} />
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
                    <button onClick={toggleSound}>
                        {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
                    </button>

                </Container>

            </Row>
        </>
    );

};

export default TurnViewer;
