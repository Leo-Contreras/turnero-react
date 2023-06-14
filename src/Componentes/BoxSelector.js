import React from 'react';

function BoxSelector({ boxes, currentBox, setCurrentBox }) {
    return (
        <div className="mb-3">
            <label className="form-label">Selecciona una caja:</label>
            <select className="form-select" value={currentBox} onChange={e => setCurrentBox(Number(e.target.value))}>
                {boxes.map(box => (
                    <option key={box} value={box}>Caja {box}</option>
                ))}
            </select>
        </div>
    );
}

export default BoxSelector;
