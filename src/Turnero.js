import React, { useState } from 'react';
import TurnDisplay from './Componentes/TurnDisplay';
import TurnButton from './Componentes/TurnButton';
import TurnHistory from "./Componentes/TurnHistory";
import BoxSelector from "./Componentes/BoxSelector";
import PendingTurns from "./Componentes/PendingTurns";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from "jspdf";
import QRCode from 'qrcode';



function Turnero({ moduleName }) {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [nextTurn, setNextTurn] = useState(0);
    const [turnHistory, setTurnHistory] = useState([]);
    const [currentBox, setCurrentBox] = useState(1);
    const [boxes] = useState([1, 2, 3, 4, 5]);

    const requestTurn = () => {
        setNextTurn(nextTurn + 1);
    };

    const size_historial = 8;

    const nextTurnInQueue = currentTurn + 1 <= nextTurn ? currentTurn + 1 : null;

    const takeTurn = async () => {
        if (nextTurn > currentTurn) {
            const newTurn = currentTurn + 1;
            setCurrentTurn(newTurn);

            // Usamos el moduleName recibido en las props y currentBox
            const boxName = `${moduleName} ${currentBox}`;

            setTurnHistory((prevHistory) => [{turn: newTurn, box: boxName}, ...prevHistory].slice(0, size_historial));

            // Generate QR Code
            const qrCodeText = `Turn: ${newTurn}, Box: ${boxName}`;
            const qrCodeDataURL = await QRCode.toDataURL(qrCodeText);

            // Generate PDF
            const pdfDoc = new jsPDF();

            const pageWidth = pdfDoc.internal.pageSize.getWidth();
            const text1 = `Turno: ${newTurn}`;
            const text2 = `Modulo: ${boxName}`;
            const xOffset1 = (pageWidth - pdfDoc.getStringUnitWidth(text1) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;
            const xOffset2 = (pageWidth - pdfDoc.getStringUnitWidth(text2) * pdfDoc.internal.getFontSize() / pdfDoc.internal.scaleFactor) / 2;

            pdfDoc.text(text1, xOffset1, 10);
            pdfDoc.text(text2, xOffset2, 20);
            pdfDoc.addImage(qrCodeDataURL, 'JPEG', (pageWidth / 2) - 25, 30, 50, 50); //Centrado horizontalmente, asumiendo que el tamaño de la imagen es 50
            pdfDoc.save(`Turno_${newTurn}.pdf`);
        } else {
            alert("No hay turnos pendientes");
        }
    };




    const resetTurns = () => {
        setCurrentTurn(0);
        setNextTurn(0);
        setTurnHistory([]);
    };



    return (
        <div className="container bg-dark">
            <div className="container text-white py-5">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="text-center">Turnero {moduleName}</h1>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <BoxSelector boxes={boxes} currentBox={currentBox} setCurrentBox={setCurrentBox} moduleName={moduleName} />
                    </div>
                    <div className="col-8">
                        <TurnButton onClick={requestTurn} label="Pedir turno" />
                        <TurnButton
                            onClick={takeTurn}
                            label="Tomar turno"
                            currentTurn={currentTurn}
                            moduleName={moduleName} // Agrega esta línea
                        />
                        <TurnButton onClick={resetTurns} label="Resetear turnero" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col text-center">
                        <TurnDisplay currentTurn={currentTurn} currentBox={currentBox} label="Turno Actual" nextTurn={nextTurnInQueue} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <TurnHistory turnHistory={turnHistory} />
                    </div>
                    <div className="col">
                        <PendingTurns currentTurn={currentTurn} nextTurn={nextTurn} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Turnero;