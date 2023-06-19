const TurnViewer = ({ turnos, imagen, logo }) => {
    return (
        <div className="turnViewer">
            <div className="turnInfo">
                {turnos.length > 0 ? (
                    <>
                        <h1>Turno Actual: {turnos[0].Turno}</h1>
                        <h2>Caja: {turnos[0].Caja}</h2>
                    </>
                ) : (
                    <h2>No hay turnos pendientes</h2>
                )}
                <h2>Turnos pendientes:</h2>
                <ul>
                    {turnos.slice(1).map((turno, index) => (
                        <li key={index}>
                            Turno: {turno.Turno}, Caja: {turno.Caja}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="turnImage">
                <img src={logo} alt="Logo" className="logoImage"/>
                <img src={imagen} alt="Imagen o Video"/>
            </div>
        </div>
    );
};

export default TurnViewer;

