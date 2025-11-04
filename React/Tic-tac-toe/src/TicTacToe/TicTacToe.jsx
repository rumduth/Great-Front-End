import { useEffect, useState } from "react";

function GridCell({ cell, onClick, isFrozen }) {
  return (
    <div
      className={
        "grid-cell" + ` ${cell !== "" || isFrozen ? "filled-cell" : ""}`
      }
      onClick={onClick}
    >
      {cell}
    </div>
  );
}

function Grid({ grid, onClick, isGameOver }) {
  function handleOnClick(id) {
    if (isGameOver) return;
    onClick(id);
  }
  return (
    <div className="grid">
      {grid.map((cell, idx) => (
        <GridCell
          key={idx}
          cell={cell}
          onClick={() => handleOnClick(idx)}
          isFrozen={isGameOver}
        />
      ))}
    </div>
  );
}

export default function TicTacToe() {
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => ""));
  const [turn, setTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    if (gameStatus !== "playing") return;
    let row = new Array(3).fill(0);
    let col = new Array(3).fill(0);
    let posDiag = 0;
    let negDiag = 0;
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (grid[i] !== "") count++;
      let r = Math.floor(i / 3);
      let c = i - 3 * r;
      if (grid[i] === "X") {
        row[r]++;
        col[c]++;
        if (r === c) posDiag++;
        if (r + c === 2) negDiag++;
      } else if (grid[i] === "O") {
        row[r]--;
        col[c]--;
        if (r === c) posDiag--;
        if (r + c === 2) negDiag--;
      }
    }
    if (
      posDiag === 3 ||
      negDiag === 3 ||
      row.some((el) => el === 3) ||
      col.some((el) => el === 3)
    )
      return setGameStatus("X");
    if (
      posDiag === -3 ||
      negDiag === -3 ||
      row.some((el) => el === -3) ||
      col.some((el) => el === -3)
    )
      return setGameStatus("O");
    if (count === 9) setGameStatus("draw");
  }, [grid, gameStatus]);

  function handleClick(idx) {
    if (grid[idx] !== "") return;
    setGrid((prev) => {
      let newGrid = [...prev];
      newGrid[idx] = turn ? "X" : "O";
      return newGrid;
    });
    setTurn((prev) => !prev);
  }

  function handleReset() {
    let ok = window.confirm("Are you sure you want to reset the game?");
    if (ok) {
      setGrid(Array.from({ length: 9 }, () => ""));
      setTurn(true);
      setGameStatus("playing");
    }
  }

  let title = `Player ${turn ? "X" : "O"} turn`;
  if (gameStatus === "draw") title = "It's a draw";
  if (gameStatus === "X") title = "Player X wins";
  if (gameStatus === "O") title = "Player O wins";
  return (
    <div className="tik-tak-toe-container">
      <h3>{title}</h3>
      <Grid
        grid={grid}
        onClick={handleClick}
        isGameOver={gameStatus !== "playing"}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
