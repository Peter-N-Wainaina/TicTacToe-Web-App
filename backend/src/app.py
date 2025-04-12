from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from src.models import GameState, MoveInput, Symbol
from src.solver import MinimaxSolver

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

solver = None

@app.get("/")
async def root():
    return {"message": "Welcome to TicTacToe"}

@app.post("/start", status_code=status.HTTP_204_NO_CONTENT)
async def start_game(input: Symbol):
    global solver
    player_symbol = input.symbol
    ai_symbol = "X" if player_symbol == "O" else "O"
    solver = MinimaxSolver(ai_symbol=ai_symbol)

@app.post("/make_move", response_model=GameState)
async def make_move(input: MoveInput):
    global solver
    player_move = (input.row, input.col, input.symbol)
    solver.advance_game(player_move)
    return solver.game_state