from pydantic import BaseModel
from typing import List, Optional, Literal

class GameState(BaseModel):
    board: List[List[Optional[str]]]
    game_over: bool
    winner: Optional[Literal["X","O"]] = None

class MoveInput(BaseModel):
    row: int
    col: int
    symbol: Literal["X","O"]

class StartInput(BaseModel):
    symbol: Literal["X","O"]
    go_first: bool
