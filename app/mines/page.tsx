"use client"

import { FaBomb, FaCube, FaDiamond, FaGem } from "react-icons/fa6";
import Sidebar from "../components/Sidebar";
import "react-icons/fa6"
import { useState } from "react";

export default function Mines() {
  const gridSize = 5;

  const [bet, setBet] = useState<number>(5);
  const [numMines, setNumMines] = useState<number>(3);
  const [grid, setGrid] = useState(Array(gridSize).fill(Array(gridSize).fill(0)));
  const [round, setRound] = useState<number>(0);
  const [revealed, setRevealed] = useState(Array(gridSize).fill(Array(gridSize).fill(false)));
  const [reward, setReward] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  let multipliers = calculateMultipliers(numMines);

  function calculateMultipliers(numMines: number): number[] {
    const totalTiles = gridSize ** 2;
    const safeTiles = totalTiles - numMines;
    let remainingSafe = safeTiles;
    let remainingTiles = totalTiles;
    const multipliers: number[] = [];

    while (remainingSafe > 0 && remainingTiles > 0) {
      const probability = remainingSafe / totalTiles;
      const multiplier = 1 / probability
      multipliers.push(multiplier);
      remainingSafe--;
      remainingTiles--;
    }

    if (numMines < 10) {
      multipliers.unshift(1, 1);
    }

    return multipliers;
  }

  function handleBtn() {
    if (gameOver) {
      startGame()
    } else {
      cashout();
    }
  }

  function cashout() {
    setReward(0);
    setGameOver(true);
    setRevealed(Array(gridSize).fill(Array(gridSize).fill(true)));
  }

  function startGame() {
    setRound(0);
    setGrid(generateGrid(gridSize, gridSize, numMines));
    setRevealed(Array(gridSize).fill(Array(gridSize).fill(false)));
    setGameOver(false);
  }

  function calculateReward(): number {
    return Math.round(multipliers[round] * bet * 100) / 100;
  }

  function generateGrid(rows: number, cols: number, numMines: number) {
    let grid = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (grid[row][col] === 0) {
        grid[row][col] = 1;
        minesPlaced++;
      }
    }
    return grid;
  }

  const handleClick = (row: number, col: number) => {
    if (gameOver || revealed[row][col]) return;
    const newRevealed = revealed.map((row) => [...row]);
    newRevealed[row][col] = true;

    setRevealed(newRevealed);
    if (grid[row][col] === 1) {
      setGameOver(true);
      setRevealed(Array(gridSize).fill(Array(gridSize).fill(true)));
      setReward(0);
      return;
    }
    setReward(calculateReward())

    setRound((prev) => prev + 1);
  };

  return (
    <>
      <div id="config" className="absolute pt-4 flex flex-col 2xl:top-[70px] top-[410px] sm:top-[450px] md:top-[780px] left-[50%] w-[300px] sm:w-[400px] md:w-[600px]  2xl:left-[18%] translate-x-[-50%] rounded-md 2xl:w-[400px] h-[300px] bg-bg2">
        <label className="ml-4  text-sm mb-2 text-primary" htmlFor="betInput">Bet Amount</label>
        <label htmlFor="betInput"><FaCube className="text-primary absolute top-[52px] left-[25px]" /></label>
        <input disabled={!gameOver} value={bet} name="betInput" type="number"
          onChange={(e) => {
            if (e.target.value == "") {
              setBet(0);
            } else {
              if (e.target.value[0] == "0" && e.target.value != new Array(e.target.value.length + 1).join("0")) {
                e.target.value = e.target.value.replace(new RegExp("^0+"), "")
              }
              setBet(parseInt(e.target.value))
            }
          }}
          className="mx-4 cursor-pointer transition-all bg-secondary focus:bg-gradient-to-l from-primary to-accent text-text text-sm focus:outline-none rounded-md h-8 pl-8" id="betInput" placeholder="Bet amount" />

        <label className="ml-4 mt-4 text-sm mb-2 text-primary" htmlFor="minesInput">Mines</label>
        <input disabled={!gameOver} name="minesInput" type="number"
          value={numMines}
          onChange={(e) => {
            if (e.target.value == "") {
              setNumMines(0);
            } else {
              if (e.target.value[0] == "0" && e.target.value != new Array(e.target.value.length + 1).join("0")) {
                e.target.value = e.target.value.replace(new RegExp("^0+"), "")
              }
              setNumMines(parseInt(e.target.value))
            }
          }}
          className="mx-4 cursor-pointer transition-all bg-secondary focus:bg-gradient-to-l from-primary to-accent text-text text-sm focus:outline-none rounded-md h-8 pl-3"
          id="minesInput" placeholder="Mines" />

        <label className="ml-4 mt-6 text-sm mb-2 text-primary">Earnings</label>
        <input name="totalEarnings" value={reward === 0 ? "" : reward} disabled className={(!gameOver && "bg-gradient-to-l from-primary to-accent") + " mx-4 cursor-pointer bg-secondary text-white text-sm focus:outline-none rounded-md h-8 pl-3"} id="minesInput" />

        <button onClick={handleBtn} disabled={reward === 0 && !gameOver} className={((reward === 0 && !gameOver) && "cursor-not-allowed ") + " bg-accent hover:bg-bg2 rounded-md mx-4 mt-4 h-9 text-white text-sm active:text-bg2 transition-colors"}>
          {gameOver &&
            <div className="flex items-center text-center justify-center">
              Start Game
              <FaCube className="ml-2 mr-[2px]"></FaCube>
              {bet.toLocaleString()}
            </div>
          }
          {!gameOver &&
            <div className="flex items-center text-center justify-center">
              Cashout
              <FaCube className="ml-2 mr-[2px]"></FaCube>
              {reward}
            </div>
          }
        </button>
      </div >

      <div id="game" className="grid p-8 md:p-12 place-items-center grid-cols-5 gap-1 md:gap-2 absolute top-[50px] left-[50%] 2xl:left-[60%] translate-x-[-50%] rounded-md w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[700px] md:h-[700px] bg-bg2">
        {grid.map((row, rowIndex) =>
          row.map((cell: number, colIndex: number) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 sm:w-16 sm:h-16  md:w-24 md:h-24 from-bg2 to-secondary rounded-md flex items-center justify-center transform transition-transform duration-200 ${revealed[rowIndex][colIndex]
                ? cell === 1
                  ? "bg-red-500"
                  : "bg-accent"
                : "bg-gradient-to-b hover:-translate-y-1 hover:shadow-lg"
                }`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {revealed[rowIndex][colIndex] && cell !== 1 &&
                <FaGem className="text-xl sm:text-2xl md:text-3xl text-text"></FaGem>
              }
              {revealed[rowIndex][colIndex] && cell === 1 &&
                <FaBomb className="text-xl sm:text-2xl md:text-3xl text-black"></FaBomb>
              }
              {!revealed[rowIndex][colIndex] &&
                <FaCube className="text-xl sm:text-2xl md:text-4xl text-primary"></FaCube>
              }
            </div>

          ))
        )}
      </div>
    </>
  )
}
