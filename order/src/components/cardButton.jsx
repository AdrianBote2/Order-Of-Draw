import React from 'react';

function CardButton({ title, onClick }) {
    return (
      <button className="card-button" onClick={onClick}>
        <div className="card-content">
          <h3>{title}</h3>
        </div>
      </button>
    );
}

export default CardButton;