import GameBoard from './GameBoard';
import Header from './Header';

const   INITIAL_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null] 
]


export default function App() {
  return (
    <div className="App">
      <Header board={INITIAL_BOARD}/>
      <button id="mode-switch">Play Human</button>
      <GameBoard board={INITIAL_BOARD}/>
    </div>
  );
}
