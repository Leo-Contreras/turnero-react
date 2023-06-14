import React, { useState } from 'react';
import TurnDisplay from './Componentes/TurnDisplay';
import TurnButton from './Componentes/TurnButton';
import TurnHistory from "./Componentes/TurnHistory";
import BoxSelector from "./Componentes/BoxSelector";
import PendingTurns from "./Componentes/PendingTurns";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [nextTurn, setNextTurn] = useState(0);
    const [turnHistory, setTurnHistory] = useState([]);
    const [currentBox, setCurrentBox] = useState(1);
    const [boxes, setBoxes] = useState([1, 2, 3, 4, 5]);

    const requestTurn = () => {
        setNextTurn(nextTurn + 1);
    };

    const size_historial = 8;

    const nextTurnInQueue = currentTurn + 1 <= nextTurn ? currentTurn + 1 : null;

    const takeTurn = () => {
        if (nextTurn > currentTurn) {
            const newTurn = currentTurn + 1;
            setCurrentTurn(newTurn);
            setTurnHistory((prevHistory) => [{turn: newTurn, box: currentBox}, ...prevHistory].slice(0, size_historial));
        } else {
            alert("No hay turnos pendientes");
        }
    };

    const resetTurns = () => {
        setCurrentTurn(0);
        setNextTurn(0);
        setTurnHistory([]);
    };

    const [currentTurnV2, setCurrentTurnV2] = useState(0);
    const [nextTurnV2, setNextTurnV2] = useState(0);
    const [turnHistoryV2, setTurnHistoryV2] = useState([]);
    const [turnQueue, setTurnQueue] = useState([]);
    const [boxesV2, setBoxesV2] = useState([1, 2, 3, 4, 5]);
    const [currentBoxV2, setCurrentBoxV2] = useState(1);

    const requestTurnV2 = () => {
        const newTurn = { turn: nextTurnV2 + 1, box: boxesV2[(nextTurnV2) % boxesV2.length]};
        setNextTurnV2(newTurn.turn);
        setTurnQueue(prevQueue => [...prevQueue, newTurn]);
    };

    const takeTurnV2 = () => {
        if (turnQueue.length > 0) {
            const newTurn = turnQueue.shift();
            setCurrentTurnV2(newTurn.turn);
            setCurrentBoxV2(newTurn.box);
            setTurnQueue(turnQueue);
            setTurnHistoryV2((prevHistory) => [{ turn: newTurn.turn, box: newTurn.box }, ...prevHistory].slice(0, 8));
        } else {
            alert("No hay turnos pendientes");
        }
    };

    const resetTurnsV2 = () => {
        setCurrentTurnV2(0);
        setNextTurnV2(0);
        setCurrentBoxV2(1);
        setTurnQueue([]);
        setTurnHistoryV2([]);
    };

    return (
        <div className="bg-dark">

            {/* Turnero 1 */}

            <div className="container text-white py-5">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="text-center">Turnero Agencia Digital</h1>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <BoxSelector boxes={boxes} currentBox={currentBox} setCurrentBox={setCurrentBox} />
                    </div>
                    <div className="col-8">
                        <TurnButton onClick={requestTurn} label="Pedir turno" />
                        <TurnButton onClick={takeTurn} label="Tomar turno" />
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

            {/* Turnero 2 */}

            <div className="container text-white py-5">
                <div className="row mb-4">
                    <div className="col">
                        <h1 className="text-center">Turnero Agencia Digital V2</h1>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <BoxSelector boxes={boxesV2} currentBox={currentBoxV2} setCurrentBox={setCurrentBoxV2} />
                    </div>
                    <div className="col-8">
                        <TurnButton onClick={requestTurnV2} label="Pedir turno V2" />
                        <TurnButton onClick={takeTurnV2} label="Tomar turno V2" />
                        <TurnButton onClick={resetTurnsV2} label="Resetear turnero V2" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col text-center">
                        <TurnDisplay currentTurn={currentTurnV2} currentBox={currentBox} label="Turno Actual V2" nextTurn={nextTurnV2} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <TurnHistory turnHistory={turnHistoryV2} />
                    </div>
                    <div className="col">
                        <PendingTurns currentTurn={currentTurnV2} nextTurn={nextTurnV2} turnQueue={turnQueue} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
