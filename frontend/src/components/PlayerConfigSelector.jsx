import "../index.css";
import { FIRST, SECOND, SYMBOL_O, SYMBOL_X } from "../constants";


export default function PlayerConfigSelector({ onSymbolChange, onTurnChange, currentSymbol, currentTurn }) {
  return (
    <div className="player-config">
      You're{" "}
      <button
        onClick={() => onSymbolChange(SYMBOL_X)}
        className={`config-btn ${currentSymbol === SYMBOL_X ? "active" : ""}`}
      >
        {SYMBOL_X}
      </button>
      <button
        onClick={() => onSymbolChange(SYMBOL_O)}
        className={`config-btn ${currentSymbol === SYMBOL_O ? "active" : ""}`}
      >
        {SYMBOL_O}
      </button>
      {" "}and you go{" "}
      <button
        onClick={() => onTurnChange(FIRST)}
        className={`config-btn ${currentTurn === "first" ? "active" : ""}`}
      >
        {FIRST}
      </button>
      <button
        onClick={() => onTurnChange(SECOND)}
        className={`config-btn ${currentTurn === "second" ? "active" : ""}`}
      >
        {SECOND}
      </button>
    </div>
  );
}
