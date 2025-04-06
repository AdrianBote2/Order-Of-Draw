import React from 'react';

function CardButton({ className,title, onClick }) {
    return (
      <button className={className} onClick={onClick}>
        <div className="card-content">
          <h3>{title}</h3>
        </div>
      </button>
    );
}

export default CardButton;