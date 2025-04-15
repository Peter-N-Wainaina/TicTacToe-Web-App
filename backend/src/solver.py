from copy import deepcopy
from math import inf
import random

import src.constants as constants
from src.exceptions import InvalidMove, CellAlreadyEmpty
from src.models import GameState
from src.board_utils import is_game_over, get_winner, available_moves, apply_move

class MinimaxSolver(object):
    def __init__(self, board=constants.EMPTY_BOARD, ai_symbol=constants.SYMBOL_O):
        self.board = deepcopy(board)
        self.winner = None
        self.game_over = False
        self.ai_symbol = ai_symbol
        self.player_symbol = constants.SYMBOL_X if ai_symbol == constants.SYMBOL_O else constants.SYMBOL_O

    @property
    def game_state(self) -> GameState:
        return GameState(board=self.board, game_over=self.game_over, winner=self.winner)
 
    def advance_game(self, player_move):
        """
        Applies the player's move, checks for win/draw, makes the AI move (if needed),
        and updates internal game state.
        """
        self.make_move(player_move)

        self.winner = get_winner(self.board)
        if is_game_over(self.board, self.winner):
            self.game_over = True
            return 
  
        self.make_ai_move()
        self.winner = get_winner(self.board)
        self.game_over = is_game_over(self.board, self.winner)

    def make_ai_move(self):
        ai_row, ai_col = self.choose_ai_move()
        ai_move = (ai_row, ai_col, self.ai_symbol)
        self.make_move(ai_move)
    
    def choose_ai_move(self):
        return (1, 1) if self.board == constants.EMPTY_BOARD else self.get_best_move()
    
    def make_move(self, move):
        row, col, symbol = move

        if self.board[row][col] is not None:
            raise InvalidMove("Invalid Move")

        self.board[row][col] = symbol

    def undo_move(self, move):
        row, col, _ = move

        if self.board[row][col] is None:
            raise CellAlreadyEmpty
        
        self.board[row][col] = None

    def get_best_move(self):
        possible_moves = available_moves(self.board)
        moves_scores = { move: -inf for move in possible_moves }
        for r,c in possible_moves:
            move = (r,c,self.ai_symbol)

            self.make_move(move)
            score = self._minimax(self.board, False)
            self.undo_move(move)

            moves_scores[(r,c)] = score

        return self._select_best_move(list(moves_scores.items()))
       

    def _minimax(self, board, is_maximizing, depth=0):
        winner = get_winner(board)
        if is_game_over(board, winner):
            return self._score_board(winner, depth)
        
        if is_maximizing:
            best_score = -inf
            for r,c in available_moves(board):
                move = (r,c,self.ai_symbol)
                new_board = apply_move(board, move)
                score = self._minimax(new_board, False, depth + 1)
                best_score = max(score, best_score)
            return best_score

        else:  # minimizing player
            best_score = inf
            for r,c in available_moves(board):
                move = (r,c, self.player_symbol)
                new_board = apply_move(board, move)
                score = self._minimax(new_board, True, depth + 1)
                best_score = min(score, best_score)
            return best_score
        
    def _score_board(self, winner, depth):
        if  winner is None:# draw
            return constants.DRAW_SCORE
        elif winner == self.ai_symbol:
            return constants.WIN_SCORE - depth
        else:
            return constants.LOSE_SCORE + depth
        
    def _select_best_move(self, moves_scores):
        """Returns a randomly selected best move among the highest scoring and highest priority tier."""

        best_score = max(score for _, score in moves_scores)
        best_score_moves = [move for move, score in moves_scores if score == best_score]

        best_tier = min(constants.MOVE_TO_TIER[move] for move in best_score_moves)
        best_tier_moves = [move for move in best_score_moves if constants.MOVE_TO_TIER[move] ==best_tier]

        return random.choice(best_tier_moves)



        