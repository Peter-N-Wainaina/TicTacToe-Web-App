import { useState } from 'react'

import GameBoard from './GameBoard';
import Header from './Header';
import GameOverModal from './GameOverModal';

const EMPTY_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null] 
]

const PLAYER_SYMBOL = "X"
const AI_SYMBOL ="O"

export default function App() {
  const [aiTurn, setAITurn] = useState(false)
  const [board, setBoard] = useState(EMPTY_BOARD)
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  async function make_post_call(endpoint, input){
    try{
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
      });
      return response;
    }
    catch(err){
      console.error("Api call error: ", err);
    }
  }

  async function startGame(playerSymbol = PLAYER_SYMBOL) {
    const endpoint = "http://localhost:8000/start";
    const input = { symbol: playerSymbol };
    const response = await make_post_call(endpoint, input);
    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    setInProgress(true);
  }

  async function updateBoard(row, col) {
    const endpoint = "http://localhost:8000/make_move";
    const input = {
      row,
      col,
      symbol: PLAYER_SYMBOL
    };
    const response = await make_post_call(endpoint, input);

    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const { board, game_over, winner } = await response.json();
    setBoard(board);
    setGameOver(game_over);
    setWinner(winner);
  }

  function resetGame(){
    setBoard(EMPTY_BOARD);
    setGameOver(false);
    setAITurn(false);
    setInProgress(false);
  }

  return (
    <div className="App">
      <Header />
      {!inProgress && <button onClick={() => startGame(PLAYER_SYMBOL)}>StartGame</button>}
      {inProgress && <GameBoard board={board} onClick={updateBoard} buttonsDisabled={aiTurn || gameOver}/> }
      {gameOver &&(
        <GameOverModal
          isDraw={gameOver && !winner}
          isAIWinner={winner === AI_SYMBOL}
          onClose={resetGame}
        />)}
    </div>
  );
}
