import "../index.css";
import { FIRST, SECOND, SYMBOL_O, SYMBOL_X } from "../constants";


export default function PlayerConfigSelector({ onPlayerSymbolSelect, onPlayerStartsSelect, currentSymbol, currentTurn }) {
  return (
    <div className="player-config">
      You're{" "}
      <button
        onClick={() => onPlayerSymbolSelect(SYMBOL_X)}
        className={`config-btn ${currentSymbol === SYMBOL_X ? "active" : ""}`}
      >
        {SYMBOL_X}
      </button>
      <button
        onClick={() => onPlayerSymbolSelect(SYMBOL_O)}
        className={`config-btn ${currentSymbol === SYMBOL_O ? "active" : ""}`}
      >
        {SYMBOL_O}
      </button>
      {" "}and you go{" "}
      <button
        onClick={() => onPlayerStartsSelect(FIRST)}
        className={`config-btn ${currentTurn === "first" ? "active" : ""}`}
      >
        {FIRST}
      </button>
      <button
        onClick={() => onPlayerStartsSelect(SECOND)}
        className={`config-btn ${currentTurn === "second" ? "active" : ""}`}
      >
        {SECOND}
      </button>
    </div>
  );
}
