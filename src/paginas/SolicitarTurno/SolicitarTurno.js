import { useState } from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Container, Alert, Row, Col, Button, Modal, InputGroup, FormControl, Toast } from 'react-bootstrap';





const SolicitarTurno = ({ cajas, onSolicitarTurno, listaTurnos }) => {
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedCaja, setSelectedCaja] = useState(null);
    const [codigo, setCodigo] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (caja) => {
        setSelectedCaja(caja);
        setShow(true);
    };

    const handleSolicitarTurno = async () => {
        onSolicitarTurno(selectedCaja, codigo);
        setShow(false);
        setShowToast(true);

        // Generar el nombre del turno
        const formattedTurnNumber = (listaTurnos.length + 1).toString().padStart(3, '0');
        const boxName = selectedCaja;
        const truncatedModuleName = boxName.substring(0, 2);
        const turnName = `${truncatedModuleName}${formattedTurnNumber}`;

        // Generar el código QR
        const qrCodeText = `Turno: ${turnName}, Caja: ${boxName}`;
        const qrCodeDataURL = await QRCode.toDataURL(qrCodeText);

        // Generar el PDF
        const pdfDoc = new jsPDF();

        const pageWidth = pdfDoc.internal.pageSize.getWidth();
        const pageHeight = pdfDoc.internal.pageSize.getHeight();

        const contentHeight = 70;
        const yOffset = (pageHeight - contentHeight) / 2;

        const text1 = `Turno: ${turnName}`;
        const text2 = `Caja: ${boxName}`;
        const xOffset1 = (pageWidth - pdfDoc.getStringUnitWidth(text1) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;
        const xOffset2 = (pageWidth - pdfDoc.getStringUnitWidth(text2) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;

        pdfDoc.setFontSize(40); // Aumenta el tamaño de la fuente a 40
        pdfDoc.text(text1, xOffset1, 10 + yOffset);
        pdfDoc.text(text2, xOffset2, 30 + yOffset);

        pdfDoc.addImage(qrCodeDataURL, 'JPEG', (pageWidth / 2) - 25, 70 + yOffset, 50, 50); //Centrado horizontalmente, asumiendo que el tamaño de la imagen es 50
        pdfDoc.save(`Turno_${turnName}.pdf`); // usamos el número de turno formateado en el nombre del archivo PDF
    };


    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>Selecciona la caja para solicitar turno</h1>
                {cajas.length === 0 ? (
                    <Alert variant="warning">
                        No hay ninguna caja registrada.
                    </Alert>
                ) : (
                    <Row className="justify-content-md-center">
                        {cajas.map((caja, index) => (
                            <Col md="auto" key={index} className="my-3">
                                <Button variant="outline-light" className="p-3" style={{ width: '200px', height: '200px' }} onClick={() => handleShow(caja)}>
                                    {caja}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                )}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Solicitar turno para {selectedCaja}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Código</InputGroup.Text>
                            <FormControl
                                placeholder="Ingresa tu código"
                                aria-label="Codigo"
                                aria-describedby="basic-addon1"
                                value={codigo}
                                onChange={e => setCodigo(e.target.value)}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSolicitarTurno}>
                            Solicitar turno
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                }}>
                    <Toast.Header>
                        <strong className="mr-auto">Nuevo turno</strong>
                    </Toast.Header>
                    <Toast.Body>Turno solicitado para {selectedCaja}</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
};

export default SolicitarTurno;

