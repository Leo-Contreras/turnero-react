import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Container, Alert, Row, Col, Button} from 'react-bootstrap';
import Logo from '../../assets/Img/logo guinda bc.png'
import './SolicitarTurno.css'


const SolicitarTurno = ({ cajas , onSolicitarTurno, listaTurnos  }) => {


    const handleSolicitarTurno = async (caja) => {
        //actualizar la lista de turnos , el cual tambien se refleja en el visualizador
        onSolicitarTurno(caja.nombre);
        // Generar el nombre del turno
        const formattedTurnNumber = (listaTurnos.length + 1).toString().padStart(3, '0');
        const boxName = caja.nombre;
        const turnName = `${formattedTurnNumber}`;

        // Generar la fecha y hora actual
        const date = new Date();
        const dateTimeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

        // Generar el código QR
        const qrCodeText = `Turno: ${turnName}, Modulo: ${boxName}`;
        const qrCodeDataURL = await QRCode.toDataURL(qrCodeText);

        // Generar el PDF
        const pdfDoc = new jsPDF();

        const pageWidth = pdfDoc.internal.pageSize.getWidth();
        const pageHeight = pdfDoc.internal.pageSize.getHeight();

        const contentHeight = 70;
        const yOffset = (pageHeight - contentHeight) / 2;

        const text1 = `Turno: ${turnName}`;
        const text2 = `Modulo: ${boxName}`;
        const xOffset1 = (pageWidth - pdfDoc.getStringUnitWidth(text1) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;
        const xOffset2 = (pageWidth - pdfDoc.getStringUnitWidth(text2) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;
        let logoDataUrl = Logo;

        const response = await fetch(Logo);
        const logoBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(logoBlob);
        reader.onloadend = function () {

            // Añadir el logo al documento PDF
            pdfDoc.addImage(logoDataUrl, 'PNG', 70, 20, 84, 40);

            pdfDoc.setFontSize(50);
            pdfDoc.setFont('Times-Bold' ,'Bold' , '50');
            pdfDoc.setTextColor(106, 18, 50);
            pdfDoc.text(text1, xOffset1 - 20, yOffset);
            pdfDoc.text(text2, xOffset2 - 20, 20 + yOffset);
            pdfDoc.addImage(qrCodeDataURL, 'JPEG', (pageWidth / 2) - 25, 30 + yOffset, 70, 60); //Centrado horizontalmente, asumiendo que el tamaño de la imagen es 50

            // Añadir la fecha y hora al documento PDF
            const xOffsetDateTime = (pageWidth - pdfDoc.getStringUnitWidth(dateTimeString) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;
            pdfDoc.text(dateTimeString, xOffsetDateTime, 130 + yOffset);

            pdfDoc.save(`Turno_${turnName}.pdf`); // usamos el número de turno formateado en el nombre del archivo PDF
        };
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>Selecciona el Modulo para solicitar turno</h1>
                {cajas.length === 0 ? (
                    <Alert variant="warning">
                        No hay ningun Modulo registrado.
                    </Alert>
                ) : (
                    <Row className="justify-content-md-center">
                        {Object.values(cajas).map((caja, index) => (
                            <Col md="auto" key={index} className="my-3">
                                <Button className="boton-solicitar-turno p-3" style={{ width: '15rem', height: '10rem' }} onClick={() => handleSolicitarTurno(caja)}>
                                    {caja.nombre}
                                </Button>
                            </Col>
                        ))}

                    </Row>
                )}
            </div>
        </Container>
    );
};

export default SolicitarTurno;
