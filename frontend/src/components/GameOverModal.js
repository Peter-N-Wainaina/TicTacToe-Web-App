export default function GameOverModal({ isDraw ,isAIWinner , onClose }){
    const winMessage = isAIWinner ? "AI Wins!" : "You Win!"
    const gameOverMessage = isDraw 
                    ? "It's a draw!"
                    : winMessage

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Game Over</h2>
                <p>{gameOverMessage}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )                  
}
