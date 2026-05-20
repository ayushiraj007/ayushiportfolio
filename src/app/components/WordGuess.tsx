import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WORDS = ['REACT', 'CODER', 'BUILT', 'DESIGN', 'PIXEL'];

export function WordGuess() {
  const [targetWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);

        if (currentGuess === targetWord) {
          setWon(true);
          setGameOver(true);
        } else if (newGuesses.length >= 6) {
          setGameOver(true);
        }

        setCurrentGuess('');
      }
    } else if (key === 'DEL') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const getLetterColor = (letter: string, index: number, word: string) => {
    if (word[index] === targetWord[index]) return 'bg-[#34d399]';
    if (targetWord.includes(letter)) return 'bg-[#fbbf24]';
    return 'bg-[#4a5568]';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Word Guess
      </h3>

      <div className="grid gap-2 mb-4">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {[...Array(5)].map((_, colIndex) => {
              const guess = guesses[rowIndex] || '';
              const letter = rowIndex === guesses.length && currentGuess ? currentGuess[colIndex] : guess[colIndex];
              const isSubmitted = rowIndex < guesses.length;

              return (
                <motion.div
                  key={colIndex}
                  className={`w-14 h-14 border-2 flex items-center justify-center text-xl font-bold rounded ${
                    isSubmitted ? getLetterColor(letter, colIndex, guess) : 'border-muted'
                  }`}
                  initial={isSubmitted ? { rotateX: 0 } : {}}
                  animate={isSubmitted ? { rotateX: 360 } : {}}
                  transition={{ delay: colIndex * 0.1 }}
                >
                  {letter || ''}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && (
        <motion.div
          className={`p-4 rounded-2xl ${won ? 'bg-[#34d399]' : 'bg-[#f87171]'} text-black`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {won ? '🎉 You won!' : `Game Over! Word was ${targetWord}`}
        </motion.div>
      )}

      <div className="grid grid-cols-10 gap-1">
        {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map((key) => (
          <button
            key={key}
            onClick={() => handleKeyPress(key)}
            className="bg-secondary hover:bg-muted p-3 rounded text-sm font-medium"
          >
            {key}
          </button>
        ))}
        <button
          onClick={() => handleKeyPress('DEL')}
          className="col-span-2 bg-secondary hover:bg-muted p-3 rounded text-sm font-medium"
        >
          DEL
        </button>
        <button
          onClick={() => handleKeyPress('ENTER')}
          className="col-span-8 bg-secondary hover:bg-muted p-3 rounded text-sm font-medium"
        >
          ENTER
        </button>
      </div>
    </div>
  );
}
