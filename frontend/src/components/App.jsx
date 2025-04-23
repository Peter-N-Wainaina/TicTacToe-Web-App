import { useState, useEffect } from 'react'

import GameBoard from './GameBoard';
import Header from './Header';
import GameOverModal from './GameOverModal';
import PlayerConfigSelector from './PlayerConfigSelector';
import { make_post_call} from '../utils';
import { getUpdatedGameState, getOtherPlayer } from '../logic/gameLogic';
import { EMPTY_BOARD, SYMBOL_X, FIRST, SECOND, START_ENDPOINT, MAKE_MOVE_ENDPOINT, GAME_MODES, SYMBOL_O} from '../constants';
 

export default function App() {
  const [board, setBoard] = useState(EMPTY_BOARD)
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [mode, setMode] = useState(GAME_MODES.AI);
  const [ aiStarts, setAIStarts ] = useState(false);

  const [aiSymbol, setAISymbol] = useState(SYMBOL_O);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [lastPlayerMove, setLastPlayerMove] = useState(null);

  useEffect(() => {
    if (inProgress && isAITurn()){
      handleAIMove();
    };
  },[currentPlayer, inProgress])


  function updateGameState(state){
    const { board, game_over, winner } = state;
    setBoard(board);
    setGameOver(game_over);
    setWinner(winner);
  }

  async function newGame() {
    setInProgress(true);

    if (mode === GAME_MODES.AI){
      const input = {
        symbol: aiSymbol,
        go_first: aiStarts
      };
      const response = await make_post_call(START_ENDPOINT, input);
      const response_json = await response.json();
      updateGameState(response_json);
      setCurrentPlayer(getOtherPlayer(aiSymbol));
    }
  }

  function handlePlayerMove(row, col) {
    const playerMove = {
      row: row,
      col: col,
      symbol: currentPlayer
    };
    setLastPlayerMove(playerMove);

    const game_state = getUpdatedGameState(board, playerMove);
    updateGameState(game_state);
    setCurrentPlayer(prevPlayer => getOtherPlayer(prevPlayer));
  }

  async function handleAIMove(){    
    const response = await make_post_call(MAKE_MOVE_ENDPOINT, lastPlayerMove);
    const response_json = await response.json();
    updateGameState(response_json);
    setCurrentPlayer(currPlayer => getOtherPlayer(currPlayer));
  } 

  function resetGame(){
    setBoard(EMPTY_BOARD);
    setAISymbol(SYMBOL_O);
    setGameOver(false);
    setInProgress(false);
    setAIStarts(false);
    setMode(GAME_MODES.AI);
    setLastPlayerMove(null);
    setCurrentPlayer(null);
    setWinner(null);
  }

  function handleTurnChange(playerTurn){
    setAIStarts(playerTurn === SECOND);
  };

  function handleSymbolSelection(playerSymbol){
    setAISymbol(playerSymbol === SYMBOL_X ? SYMBOL_O : SYMBOL_X);
  }

  function isAITurn(){return mode === GAME_MODES.AI && currentPlayer === aiSymbol}

  return (
    <div className="App">
      <Header />
      {!inProgress && (
        <PlayerConfigSelector
          onPlayerSymbolSelect={handleSymbolSelection}
          onPlayerStartsSelect={handleTurnChange}
          currentSymbol={aiSymbol === SYMBOL_X ? SYMBOL_O : SYMBOL_X}
          currentTurn={aiStarts ? SECOND : FIRST}/>)
      }
      {!inProgress && <button onClick={newGame}>New Game</button>}
      {(inProgress && isAITurn())  && <p className="thinking">Thinking<span className="dots"></span></p>}
      {inProgress && <GameBoard board={board} onClick={handlePlayerMove} buttonsDisabled={isAITurn()|| gameOver}/> }
      {gameOver &&(
        <GameOverModal
          isDraw={gameOver && !winner}
          isAIWinner={winner === aiSymbol}
          onClose={resetGame}/>)
      }
    </div>
  );
}
