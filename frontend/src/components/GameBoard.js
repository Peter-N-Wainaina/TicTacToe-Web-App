export default function GameBoard({ board, onClick, buttonsDisabled }) {
    return <ol id="board">
        {
            board.map(
                (row, rIdx) =>
                    <li key={rIdx}>
                        <ol>
                            {
                                row.map(
                                    (item, cIdx) =>
                                        <li key={cIdx}>
                                            <button id="disabled" disabled={buttonsDisabled || item !== null } onClick={() => onClick(rIdx, cIdx)}>{item}</button>
                                        </li>
                                )
                            }
                        </ol>

                    </li>
            )
        }
    </ol>
}