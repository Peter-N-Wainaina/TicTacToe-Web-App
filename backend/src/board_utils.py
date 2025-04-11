from copy import deepcopy
from math import inf

def is_board_full(board): 
    return not any(cell is None for row in board for cell in row)

def is_game_over(board, winner):
    return (winner is not None) or is_board_full(board)

def get_winner(board) -> str | None:     
    row_winner = get_row_winner(board)
    col_winner = get_col_winner(board)
    diag_winner = get_diagonal_winner(board)
    return row_winner or col_winner or diag_winner

def get_row_winner(board):
    for row in board:
        if all_equal(row):
            return row[0]

def get_col_winner(board):
    b_transpose = [list(row) for row in zip(*board)]
    return get_row_winner(b_transpose)

def get_diagonal_winner(board):
    n = len(board)
    leading = [board[i][i] for i in range(n)]
    secondary = [board[i][n - 1 - i] for i in range(n)]

    if all_equal(leading):
        return leading[0]
    if  all_equal(secondary):
        return secondary[0]
    
def all_equal(lst):
    return lst[0] is not None and all(x == lst[0] for x in lst)

def available_moves(board):
    n = len(board)
    moves = [(rIdx, cIdx)
            for rIdx in range(n) 
            for cIdx in range(n)
            if board[rIdx] [cIdx] is None
    ]
    return moves

def apply_move(board, move):
    new_board = deepcopy(board)
    row, col, symbol = move
    new_board[row][col] = symbol
    return new_board
