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
  