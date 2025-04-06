import React from 'react';
import './CardDescription.css';

const CardDescription = ({ title, description, isVisible }) => {
  return (
    <div className={`card-description ${isVisible ? 'visible' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardDescription;