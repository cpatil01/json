import React from 'react';
import './Cards.css';
import cardData from './cardData.json';

function Card() {
  return (
    <div className="card-container">
      {cardData.map((card) => (
        <div key={card.id} className="card1">
          <img src={card.imageSrc} alt={card.altText} />
          <h3>{card.heading}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
