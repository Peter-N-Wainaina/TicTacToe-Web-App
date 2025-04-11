import pytest

from src.solver import MinimaxSolver
from src.exceptions import InvalidMove, CellAlreadyEmpty

EMPTY_BOARD = [
  [None, None, None], 
  [None, None, None], 
  [None, None, None] 
]
X = "X"
O = "O"

@pytest.fixture 
def solver():
    """Fixture to create a solver instance before each test"""
    return MinimaxSolver(EMPTY_BOARD)

def test_initialization():
    solver = MinimaxSolver()
    assert solver.game_over == False
    assert solver.winner == None
    assert solver.ai_symbol == O
    assert solver.player_symbol == X

    solver = MinimaxSolver(ai_symbol=X)
    assert solver.game_over == False
    assert solver.winner == None
    assert solver.ai_symbol == X
    assert solver.player_symbol == O

def test_make_move(solver):
    solver.make_move((0,0, X))
    assert solver.board[0][0] == X

def test_make_multiple_moves(solver):
    solver.make_move((0, 0, X))
    solver.make_move((1, 1, O))
    assert solver.board[0][0] == X
    assert solver.board[1][1] == O

def test_cannot_overwrite_existing_move(solver):
    solver.make_move((2, 2, X))
    with pytest.raises(InvalidMove):
        solver.make_move((2, 2, O)) 

def test_other_cells_remain_unchanged(solver):
    solver.make_move((0, 1, O))
    for row in range(3):
        for col in range(3):
            if (row, col) != (0, 1):
                assert solver.board[row][col] is None

def test_undo_move(solver):
    move = (0,0,X)
    solver.make_move(move)
    solver.undo_move(move)
    assert solver.board[0][0] == None

def test_cannot_undo_unoccupied_cell(solver):
    with pytest.raises(CellAlreadyEmpty):
        solver.undo_move((2, 2, O)) 

def test_initial_game_state(solver):
    state = solver.game_state
    assert state.board == EMPTY_BOARD
    assert state.winner == None
    assert state.game_over == False

def test_ai_wins_after_player_move():
    ai_win_board = [
        [X, X, O], 
        [O, O, X], 
        [None, None, O] 
    ]
    solver = MinimaxSolver(ai_win_board, O)
    solver.advance_game((2, 1, X))
    state = solver.game_state

    assert state.winner == O
    assert state.game_over is True

def test_player_wins_before_ai_moves():
    player_win_board = [
        [X, X, O], 
        [X, O, X], 
        [None, O, O] 
    ]
    solver = MinimaxSolver(player_win_board, O)
    solver.advance_game((2, 0, X))
    state = solver.game_state

    assert state.winner == X
    assert state.game_over is True

def test_draw_after_player_move():
    draw_board = [
        [None, X, O], 
        [X, O, X], 
        [X, O, None] 
    ]
    solver = MinimaxSolver(draw_board, O)
    solver.advance_game((2, 2, X))
    state = solver.game_state

    assert state.winner is None
    assert state.game_over is True

def test_game_continues_after_non_terminal_player_move():
    solver = MinimaxSolver(ai_symbol=O)
    solver.advance_game((0, 0, X))
    state = solver.game_state

    assert state.winner is None
    assert state.game_over is False

def test_ai_takes_winning_move():
    board = [
        [O, O, None],
        [X, X, None],
        [None, None, None]
    ]
    solver = MinimaxSolver(board, ai_symbol=O)
    best_move = solver.get_best_move()
    assert best_move == (0, 2)

def test_ai_blocks_opponent_win():
    board = [
        [X, X, None],
        [O, None, None],
        [None, None, None]
    ]
    solver = MinimaxSolver(board, ai_symbol=O)
    best_move = solver.get_best_move()
    assert best_move == (0, 2)

def test_ai_plays_for_draw():
    board = [
        [X, O, X],
        [X, O, None],
        [O, X, None]
    ]
    solver = MinimaxSolver(board, ai_symbol=O)
    best_move = solver.get_best_move()
    assert best_move in [(1, 2), (2, 2)]  # either leads to draw

def test_ai_takes_center_on_empty_board():
    print("Started testing takes center")
    solver = MinimaxSolver()
    move = solver.get_best_move()
    assert move == (1, 1)
