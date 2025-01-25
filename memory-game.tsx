import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
  const CARD_SYMBOLS = ['🍎', '🍌', '🍇', '🍊', '🍋', '🍉', '🍓', '🍒'];
  const GRID_SIZE = 4;

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    const duplicatedSymbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        symbol,
        id: index,
        flipped: false
      }));

    setCards(duplicatedSymbols);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedCard) => {
    if (
      flipped.length === 2 || 
      matched.includes(clickedCard.id) || 
      flipped.some(card => card.id === clickedCard.id)
    ) return;

    const newFlipped = [...flipped, clickedCard];
    setFlipped(newFlipped);
    setMoves(prev => prev + 1);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        if (newFlipped[0].symbol === newFlipped[1].symbol) {
          setMatched(prev => [...prev, newFlipped[0].id, newFlipped[1].id]);
        }
        setFlipped([]);
      }, 1000);
    }

    if (matched.length + 2 === cards.length) {
      setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">Memory Game</h1>
      {gameOver ? (
        <div className="text-center mb-4">
          <p className="text-xl">Congratulations! 🎉</p>
          <p>You completed the game in {moves} moves</p>
          <button 
            onClick={initializeGame} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-center mb-4">
          <p>Moves: {moves}</p>
        </div>
      )}
      <div 
        className="grid gap-2"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '300px' 
        }}
      >
        {cards.map(card => (
          <div 
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`
              w-16 h-16 flex items-center justify-center 
              border-2 rounded-lg cursor-pointer text-3xl
              ${matched.includes(card.id) 
                ? 'bg-green-200' 
                : flipped.some(c => c.id === card.id) 
                  ? 'bg-blue-200' 
                  : 'bg-gray-200'
              }
            `}
          >
            {matched.includes(card.id) || flipped.some(c => c.id === card.id) 
              ? card.symbol 
              : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
