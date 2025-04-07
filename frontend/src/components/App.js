import GameBoard from './GameBoard';
import Header from './Header';
import { useState } from 'react'

const   INITIAL_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null] 
]

const SYMBOL_X = "X"
const SYMBOL_O = "O"

function getBoardFromMoves(moves){
  let board = [...INITIAL_BOARD.map(row => [...row])]

  for (const move of moves){
      const {row, col, symbol} = move;
      board[row][col] = symbol;
  }
  return board;
}

function randomMove(board) {
  // Collect all available moves
  const availableMoves = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        availableMoves.push({ row: i, col: j });
      }
    }
  }

  // Choose a random move from the available ones
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

export default function App() {
  const [moves, setMoves] = useState([]) //Keep track of all moves made i.e position and symbol
  const [aiTurn, setAITurn] = useState(false)

  let board = getBoardFromMoves(moves)

  function makeAIMove(){
    setMoves((prevMoves) => {
      const curr_board = getBoardFromMoves(prevMoves)
      const move = randomMove(curr_board)
      let nextSymbol = SYMBOL_X;
      if (prevMoves.length > 0 && prevMoves[0].symbol === SYMBOL_X){
        nextSymbol = SYMBOL_O;
      }
      let finalMoves = [
        {row:move.row, col:move.col, symbol: nextSymbol},
        ...prevMoves
      ]
      return finalMoves;
    })
    setAITurn(false);
  }

  function handlePlayerMove(rIdx, cIdx){
    setMoves(
      (prevMoves)=> {
        let nextSymbol = SYMBOL_X  //First player is always X
        if (prevMoves.length > 0 && prevMoves[0].symbol === SYMBOL_X){
          nextSymbol = SYMBOL_O;
        }
        let newMoves = [
          {row:rIdx, col:cIdx, symbol:nextSymbol},
          ...prevMoves]
        return newMoves     
      }
    ) 
    setAITurn(true);
    makeAIMove(); 
  }

  return (
    <div className="App">
      <Header />
      <button id="mode-switch">Play Human</button>
      <GameBoard board={board} onClick={handlePlayerMove} buttonsDisabled={aiTurn}/>
    </div>
  );
}
