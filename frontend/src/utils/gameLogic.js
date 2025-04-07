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
    }
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

  export function isGameOver(){
    const winner = checkWinner(board);
    if (winner !== null) return {game_over: true, winner:winner}
    if (isDraw(board)) return {game_over: true, winner: null}
    return {game_over:false, winner:null}
  }
  