import Board from "../components/Board";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        xIsNext: true,
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i) => {
    var history = state.history.slice(0, state.stepNumber + 1);
    var current = history[history.length - 1];

    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = state.xIsNext ? "X" : "O";

    setState({
      history: history.concat([
        {
          squares: squares,
          xIsNext: !state.xIsNext,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step) => {
    setState({
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: true,
        },
      ],
      stepNumber: step,
      xIsNext: step % 2 ? false : true,
    });
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = "Pemenang: " + winner;
  } else {
    status = "Pemain selanjutnya: " + (state.xIsNext ? "X" : "O");
  }

  let moveReset;
  let movesX = [];
  let movesO = [];

  history.map((step, move) => {
    let desc;

    if (move === 0) {
      desc = "Mainkan ulang";

      moveReset = (
        <a href="#" onClick={() => jumpTo(move)}>
          {desc}
        </a>
      );
    } else {
      if (step.xIsNext) {
        desc = "Pergerakan ke #" + step.squares.filter((q) => !!q).length;

        movesO.push(
          <li key={move}>
            <a href="#" onClick={() => jumpTo(move)}>
              {desc}
            </a>
          </li>
        );
      } else {
        desc = "Pergerakan ke #" + step.squares.filter((q) => !!q).length;

        movesX.push(
          <li key={move}>
            <a href="#" onClick={() => jumpTo(move)}>
              {desc}
            </a>
          </li>
        );
      }
    }
  });

  return (
    <div className="game-wrap">
      <div className="game-header">
        <div>{status}</div>
        <div>{moveReset}</div>
      </div>
      <div className="game-body">
        <div className="game-left">
          <div className="title">Pemain: X</div>
          <ol>{movesX}</ol>
        </div>
        <div className="game-main">
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className="game-right">
          <div className="title">Pemain: O</div>
          <ol>{movesO}</ol>
        </div>
      </div>
    </div>
  );
}
