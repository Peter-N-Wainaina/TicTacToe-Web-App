import { SYMBOL_O, SYMBOL_X } from "../constants";

function isDraw(board) {
    const flat = board.flat();
    const cellSet = new Set(flat);
    return !cellSet.has(null);
  }

  function transpose(board) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  }

  function scanRows(board){
    for (const row of board){
      const row_set = new Set(row);
      if (row_set.length === 1){
        const row_value = row_set[0];
        if (row_value !== null) return row_value;
      }
      if (allEqual(row)) return row[0];
    }
    return null
  }

  function allEqual(arr){
    return arr.every(cell => cell != null && cell === arr[0])
  }

  function scanDiagonals(board) {
    const center = board[1][1];

    // Diagonal 1
    if (
      center &&
      board[0][0] === center &&
      board[2][2] === center
    ) {
      return center;
    }

    // Diagonal 2
    if (
      center &&
      board[0][2] === center &&
      board[2][0] === center
    ) {
      return center;
    }

    return null;
  }
  function checkWinner(board) {
    const row_winner = scanRows(board);
    const col_winner = scanRows(transpose(board));
    const diag_winner = scanDiagonals(board);
    return row_winner || col_winner || diag_winner
  }

  export function isGameOver(board){
    const winner = checkWinner(board);
    if (winner !== null) return {game_over: true, winner:winner}
    if (isDraw(board)) return {game_over: true, winner: null}
    return {game_over:false, winner:null}
  }

  export function updateBoard(board, move){
    const {row, col, symbol} = move;
    const new_board = [...board.map(row => [...row])];
    new_board[row][col] = symbol;
    return new_board;
  }

  export function getUpdatedGameState(board, move){
    const new_board = updateBoard(board, move);
    const {game_over, winner} = isGameOver(new_board);
    return {board:new_board, game_over:game_over, winner:winner}
  }


export function getOtherPlayer(currentPlayer){
  return  currentPlayer === SYMBOL_X ? SYMBOL_O : SYMBOL_X;
}