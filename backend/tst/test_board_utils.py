from src.board_utils import (
    is_board_full,
    is_game_over,
    get_winner,
    get_row_winner,
    get_col_winner,
    get_diagonal_winner,
    all_equal
)

X, O = "X", "O"

# --- Tests for all_equal ---
def test_all_equal_all_same():
    assert all_equal([X, X, X]) is True

def test_all_equal_with_none():
    assert all_equal([None, X, X]) is False

def test_all_equal_mixed():
    assert all_equal([X, O, X]) is False

# --- Tests for is_board_full ---
def test_board_full():
    board = [[X, O, X], [O, X, O], [X, O, X]]
    assert is_board_full(board) is True

def test_board_not_full():
    board = [[X, O, None], [O, X, O], [X, O, X]]
    assert is_board_full(board) is False

# --- Tests for get_row_winner ---
def test_row_win():
    board = [[X, X, X], [O, None, O], [None, None, None]]
    assert get_row_winner(board) == X

def test_no_row_win():
    board = [[X, O, X], [O, X, O], [X, O, X]]
    assert get_row_winner(board) is None

# --- Tests for get_col_winner ---
def test_col_win():
    board = [[X, O, None], [X, O, None], [X, None, None]]
    assert get_col_winner(board) == X

def test_no_col_win():
    board = [[X, O, X], [O, X, O], [X, O, X]]
    assert get_col_winner(board) is None

# --- Tests for get_diagonal_winner ---
def test_leading_diagonal_win():
    board = [[X, O, None], [O, X, None], [None, None, X]]
    assert get_diagonal_winner(board) == X

def test_secondary_diagonal_win():
    board = [[None, O, X], [None, X, O], [X, None, None]]
    assert get_diagonal_winner(board) == X

def test_no_diagonal_win():
    board = [[X, O, X], [O, O, X], [X, X, O]]
    assert get_diagonal_winner(board) is None

# --- Tests for get_winner ---
def test_get_winner_row():
    board = [[O, O, O], [X, None, X], [None, X, None]]
    assert get_winner(board) == O

def test_get_winner_col():
    board = [[X, O, None], [X, O, None], [X, None, None]]
    assert get_winner(board) == X

def test_get_winner_diag():
    board = [[O, X, X], [X, O, X], [None, X, O]]
    assert get_winner(board) == O

def test_get_winner_none():
    board = [[X, O, X], [O, X, O], [O, X, O]]
    assert get_winner(board) is None

# --- Tests for is_game_over ---
def test_game_over_with_winner():
    board = [[X, X, X], [None, None, None], [None, None, None]]
    assert is_game_over(board, winner=X) is True

def test_game_over_with_draw():
    board = [[X, O, X], [O, X, O], [O, X, O]]
    assert is_game_over(board, winner=None) is True

def test_game_not_over():
    board = [[X, O, None], [None, None, None], [None, None, None]]
    assert is_game_over(board, winner=None) is False
