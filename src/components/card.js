import React from 'react';
import '../App.css';

function Card({ card, onClick, isFlipped }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.symbol}</div>
      </div>
    </div>
  );
}

export default Card;