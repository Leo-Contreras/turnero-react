import React from 'react';

function PendingTurns({ currentTurn, nextTurn }) {
    const pendingTurns = [];
    for (let i = nextTurn - 1; i > currentTurn; i--) {
        pendingTurns.push(i);
    }

    return (
        <div className="mb-3">
            <h2>Turnos pendientes:</h2>
            <ul className="list-group">
                {pendingTurns.map((turn, index) => (
                    <li key={index}
                        className={`list-group-item text-white ${index === pendingTurns.length - 1 ? 'h3' : 'h4'}`}
                        style={{ backgroundColor: index === pendingTurns.length - 1 ? '#1a8cff' : '#6c757d' }}>
                        Turno {turn}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PendingTurns;

