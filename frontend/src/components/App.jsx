import { useState } from 'react'

import GameBoard from './GameBoard';
import Header from './Header';
import GameOverModal from './GameOverModal';
import PlayerConfigSelector from './PlayerConfigSelector';
import { make_post_call } from '../utils';
import { EMPTY_BOARD, SYMBOL_X, FIRST, SECOND, START_ENDPOINT, MAKE_MOVE_ENDPOINT} from '../constants';
 

export default function App() {
  const [isAITurn, setIsAITurn] = useState(false)
  const [board, setBoard] = useState(EMPTY_BOARD)
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState(SYMBOL_X);

  function updateGameState(state){
    const { board, game_over, winner } = state;
    setBoard(board);
    setGameOver(game_over);
    setWinner(winner);
  }

  async function newGame() {
    const input = {
      symbol: playerSymbol,
      go_first: isAITurn
    };
    const response = await make_post_call(START_ENDPOINT, input);
    const response_json = await response.json();

    updateGameState(response_json);
    setIsAITurn(false);
    setInProgress(true);
  }

  async function handlePlayerMove(row, col) {
    const input = {
      row,
      col,
      symbol: playerSymbol
    };
    const response = await make_post_call(MAKE_MOVE_ENDPOINT, input);
    const response_json = await response.json();
    updateGameState(response_json)
  }

  function resetGame(){
    setBoard(EMPTY_BOARD);
    setGameOver(false);
    setWinner(null);
    setIsAITurn(false);
    setInProgress(false);
    setPlayerSymbol(SYMBOL_X);
  }

  function handlePlayerTurn(playerTurn){
    const playerStarts = playerTurn === FIRST
    setIsAITurn(!playerStarts);
  };

  return (
    <div className="App">
      <Header />
      {!inProgress && (
        <PlayerConfigSelector
          onSymbolChange={setPlayerSymbol}
          onTurnChange={handlePlayerTurn}
          currentSymbol={playerSymbol}
          currentTurn={isAITurn ? SECOND : FIRST}/>)
      }
      {!inProgress && <button onClick={newGame}>New Game</button>}
      {inProgress && <GameBoard board={board} onClick={handlePlayerMove} buttonsDisabled={isAITurn || gameOver}/> }
      {gameOver &&(
        <GameOverModal
          isDraw={gameOver && !winner}
          isAIWinner={winner !== playerSymbol}
          onClose={resetGame}/>)
      }
    </div>
  );
}
