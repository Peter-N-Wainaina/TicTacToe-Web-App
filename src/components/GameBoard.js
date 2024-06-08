export default function GameBoard({board}){
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
                                            <button>{item}</button>
                                        </li>
                                )
                            }
                        </ol>

                </li>
            )
        }
    </ol>
}