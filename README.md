# TicTacToe Web App 🎮

A web-based implementation of the classic TicTacToe game. Challenge yourself against an **unbeatable AI** powered by the **Minimax algorithm**!

## 🧠 Features

- Interactive 3x3 game board  
- Play against a perfect AI opponent  
- Minimax-based move generation ensures optimal gameplay  
- Instant win/draw detection  

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Python 3.10+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/)

### Run the Frontend

```bash
cd frontend
npm install
npm start
```

### Run the Backend

```cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

This starts the FastAPI server at http://localhost:8000.

## 📌 Future Plans

- Option to play against another human
- Backend for multiplayer support
