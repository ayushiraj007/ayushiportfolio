import { useState } from 'react';
import { motion } from 'motion/react';

// Simple 4x4 number puzzle
const PUZZLE = [
  [5, 0, 0, 2],
  [0, 3, 0, 0],
  [0, 0, 1, 0],
  [4, 0, 0, 3]
];

const SOLUTION = [
  [5, 1, 4, 2],
  [2, 3, 5, 1],
  [3, 2, 1, 4],
  [4, 5, 2, 3]
];

export function NumberGrid() {
  const [grid, setGrid] = useState(PUZZLE.map(row => [...row]));
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (PUZZLE[row][col] === 0) {
      setSelected({ row, col });
    }
  };

  const handleNumberClick = (num: number) => {
    if (selected) {
      const newGrid = grid.map(row => [...row]);
      newGrid[selected.row][selected.col] = num;
      setGrid(newGrid);
    }
  };

  const isCorrect = (row: number, col: number) => {
    return grid[row][col] !== 0 && grid[row][col] === SOLUTION[row][col];
  };

  const isWrong = (row: number, col: number) => {
    return grid[row][col] !== 0 && grid[row][col] !== SOLUTION[row][col];
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Number Grid
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        Fill each row and column with numbers 1-5
      </p>

      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isPrefilled = PUZZLE[rowIndex][colIndex] !== 0;
            const isSelected = selected?.row === rowIndex && selected?.col === colIndex;

            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-lg border-2 ${
                  isPrefilled
                    ? 'bg-secondary border-border cursor-default'
                    : isSelected
                    ? 'bg-accent border-accent text-black'
                    : isCorrect(rowIndex, colIndex)
                    ? 'bg-[#34d399] border-[#34d399] text-black'
                    : isWrong(rowIndex, colIndex)
                    ? 'bg-[#f87171] border-[#f87171] text-black'
                    : 'bg-background border-muted hover:bg-secondary'
                }`}
                whileHover={!isPrefilled ? { scale: 1.05 } : {}}
                whileTap={!isPrefilled ? { scale: 0.95 } : {}}
              >
                {cell || ''}
              </motion.button>
            );
          })
        )}
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <motion.button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="w-12 h-12 bg-secondary hover:bg-muted rounded-lg font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {num}
          </motion.button>
        ))}
        <motion.button
          onClick={() => selected && handleNumberClick(0)}
          className="w-12 h-12 bg-secondary hover:bg-muted rounded-lg font-bold text-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </div>
    </div>
  );
}
