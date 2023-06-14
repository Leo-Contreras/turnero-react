import React from 'react';

function TurnButton({ onClick, label }) {
    return <button className="btn btn-primary w-100 mb-2" onClick={onClick}>{label}</button>;
}

export default TurnButton;
