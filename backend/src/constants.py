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

TIER_MAP = {
    0: [(1, 1)],
    1: [(0, 0), (0, 2), (2, 0), (2, 2)],
    2: [(0, 1), (1, 0), (1, 2), (2, 1)],
}
# Create reverse lookup for tier
MOVE_TO_TIER = {move: tier for tier, moves in TIER_MAP.items() for move in moves}