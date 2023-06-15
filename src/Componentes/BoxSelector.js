function BoxSelector({ boxes, currentBox, setCurrentBox, moduleName }) {


    return (
        <div className="card">
            <div className="card-header">
                {`${moduleName}`}
            </div>
            <div className="list-group list-group-flush">
                {boxes.map((box) => (
                    <button key={box} onClick={() => setCurrentBox(box)}
                            className={`list-group-item list-group-item-action ${currentBox === box ? 'active' : ''}`}>
                        {`${moduleName} ${box}`}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BoxSelector;

