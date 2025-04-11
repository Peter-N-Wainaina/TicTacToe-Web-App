EMPTY_BOARD = [
  [None, None, None], 
  [None, None, None], 
  [None, None, None] 
]

SYMBOL_X = "X"
SYMBOL_O = "O"

WIN_SCORE = 10
LOSE_SCORE = -10
DRAW_SCORE = 0

PREFERRED_MOVE_ORDER = [
    (1, 1),  # center
    (0, 0), (0, 2), (2, 0), (2, 2),  # corners
    (0, 1), (1, 0), (1, 2), (2, 1)   # edges
]