import React, { useState, useEffect } from 'react';
import Card from './card'
const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍑', '🍍']; // 8 unique symbols

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = shuffleArray([...symbols, ...symbols]).map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
    }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.includes(card) || matchedCards.includes(card)) return;
    setFlippedCards((prev) => [...prev, card]);
    setMoves(moves + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.symbol === second.symbol) {
        setMatchedCards((prev) => [...prev, first, second]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card === first || card === second ? { ...card, isFlipped: false } : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === symbols.length * 2) {
      alert(`Congratulations! You won in ${moves} moves.`);
    }
  }, [matchedCards]);

  return (
    <div className="game">
      <div className="game-info">
        <p>Moves: {moves}</p>
        <button onClick={resetGame}>Restart Game</button>
      </div>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;