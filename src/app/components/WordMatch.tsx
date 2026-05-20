import { useState } from 'react';
import { motion } from 'motion/react';

const WORDS = [
  { word: 'REACT', group: 'Tech', color: 'bg-[#60a5fa]' },
  { word: 'VUE', group: 'Tech', color: 'bg-[#60a5fa]' },
  { word: 'ANGULAR', group: 'Tech', color: 'bg-[#60a5fa]' },
  { word: 'SVELTE', group: 'Tech', color: 'bg-[#60a5fa]' },

  { word: 'RED', group: 'Colors', color: 'bg-[#f87171]' },
  { word: 'BLUE', group: 'Colors', color: 'bg-[#f87171]' },
  { word: 'GREEN', group: 'Colors', color: 'bg-[#f87171]' },
  { word: 'YELLOW', group: 'Colors', color: 'bg-[#f87171]' },

  { word: 'APPLE', group: 'Fruits', color: 'bg-[#34d399]' },
  { word: 'ORANGE', group: 'Fruits', color: 'bg-[#34d399]' },
  { word: 'BANANA', group: 'Fruits', color: 'bg-[#34d399]' },
  { word: 'GRAPE', group: 'Fruits', color: 'bg-[#34d399]' },
];

export function WordMatch() {
  const [shuffled] = useState(() => [...WORDS].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleWordClick = (word: string) => {
    if (solved.includes(word)) return;

    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word));
    } else if (selected.length < 4) {
      const newSelected = [...selected, word];
      setSelected(newSelected);

      if (newSelected.length === 4) {
        const groups = newSelected.map(w => WORDS.find(item => item.word === w)?.group);
        const allSame = groups.every(g => g === groups[0]);

        if (allSame) {
          setSolved([...solved, ...newSelected]);
          setSelected([]);
          setMessage('✅ Correct!');
          setTimeout(() => setMessage(''), 2000);
        } else {
          setMessage('❌ Not quite!');
          setTimeout(() => {
            setSelected([]);
            setMessage('');
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Word Match
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        Find groups of 4 related words
      </p>

      {message && (
        <motion.div
          className="text-lg font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {message}
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-2 max-w-md">
        {shuffled.map((item) => {
          const isSolved = solved.includes(item.word);
          const isSelected = selected.includes(item.word);
          const solvedItem = WORDS.find(w => w.word === item.word);

          return (
            <motion.button
              key={item.word}
              onClick={() => handleWordClick(item.word)}
              className={`p-4 rounded-lg font-medium text-sm ${
                isSolved
                  ? `${solvedItem?.color} text-black`
                  : isSelected
                  ? 'bg-accent text-black'
                  : 'bg-secondary hover:bg-muted'
              }`}
              whileHover={!isSolved ? { scale: 1.05 } : {}}
              whileTap={!isSolved ? { scale: 0.95 } : {}}
              disabled={isSolved}
            >
              {item.word}
            </motion.button>
          );
        })}
      </div>

      {solved.length === WORDS.length && (
        <motion.div
          className="p-4 bg-[#34d399] text-black rounded-2xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🎉 All groups found!
        </motion.div>
      )}
    </div>
  );
}
