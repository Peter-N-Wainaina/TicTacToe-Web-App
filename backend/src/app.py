from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from src.models import GameState, MoveInput, StartInput
from src.solver import MinimaxSolver

app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware, 
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

solver = None

@app.get("/")
async def root():
    return {"message": "Welcome to TicTacToe"}

@app.post("/start", response_model=GameState)
async def start_game(input: StartInput):
    global solver

    player_symbol = input.symbol
    ai_symbol = "X" if player_symbol == "O" else "O"
    solver = MinimaxSolver(ai_symbol=ai_symbol)

    if input.go_first:
        solver.make_ai_move()
        
    return solver.game_state

@app.post("/make_move", response_model=GameState)
async def make_move(input: MoveInput):
    global solver
    player_move = (input.row, input.col, input.symbol)
    solver.advance_game(player_move)
    return solver.game_state