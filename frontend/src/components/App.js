import { useState, useEffect } from 'react'
import GameBoard from './GameBoard';
import Header from './Header';

import GameOverModal from './GameOverModal';
import { isGameOver } from '../utils/gameLogic';

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

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const result = isGameOver(board);
    setGameOver(result.game_over);
    setWinner(result.winner);

    if (aiTurn && !result.game_over) handleAIMove();

  },[board])

  useEffect(() => {
  }, [aiTurn])

  function getRandomMove() {
    const availableMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          availableMoves.push({ row: i, col: j });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }
 
  function makeMove(rowIdx, colIdx, symbol) {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newBoard[rowIdx][colIdx] = symbol;
      return newBoard;
    });
  }

  function handleAIMove(){
    const {row, col} = getRandomMove();
    makeMove(row, col, AI_SYMBOL)
    setAITurn(false);
  }

  function handlePlayerMove(row, col){
    makeMove(row, col, PLAYER_SYMBOL)
    setAITurn(true);
  }

  function resetGame(){
    setBoard(EMPTY_BOARD);
    setGameOver(false);
    setAITurn(false);
  }

  return (
    <div className="App">
      <Header />
      <GameBoard board={board} onClick={handlePlayerMove} buttonsDisabled={aiTurn || gameOver}/>
      {gameOver &&(
        <GameOverModal
          isDraw={gameOver && !winner}
          isAIWinner={winner === AI_SYMBOL}
          onClose={resetGame}
        />)}
    </div>
  );
}
