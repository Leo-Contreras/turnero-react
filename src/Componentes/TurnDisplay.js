import React from 'react';

function TurnDisplay({ currentTurn, label, nextTurn }) {
    return (
        <div>
            <h2>{label}: {currentTurn}</h2>
            {label === "Turno Actual"}
            {label === "Turno Actual" && nextTurn && <h2>Próximo turno: {nextTurn}</h2>}
        </div>
    );
}

export default TurnDisplay;
