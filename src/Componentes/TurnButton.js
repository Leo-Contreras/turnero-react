function TurnButton({ onClick, label }) {
    return (
        <button onClick={onClick}>{label}</button>
    );
}

export default TurnButton;
