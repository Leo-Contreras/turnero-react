import React from 'react';

function TurnHistory({ turnHistory }) {
    return (
        <div className="mb-3">
            <h2>Historial de turnos:</h2>
            <ul className="list-group">
                {turnHistory.map((item, index) => (
                    <li key={index}
                        className={`list-group-item text-white ${index === 0 ? 'h3' : 'h4'}`}
                        style={{ backgroundColor: index === 0 ? '#1a8cff' : '#6c757d' }}>
                        Turno {item.turn} tomado por la caja {item.box}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TurnHistory;
