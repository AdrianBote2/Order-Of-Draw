import React, { useState } from 'react';
import CardButton from './cardButton'; // Importing the CardButton component
import CardDescription from './CardDescription'; // Import the new CardDescription component
import './cardList.css'; // Importing the CSS file for styling

// Example JSON data - kept the same as original
const jsonData = [
    { id: 1, title: 'HIV', description: 'This is the first card.' },
    { id: 2, title: 'Hepatitis B & C Test', description: 'This is the second card.' },
    { id: 3, title: 'Complete Blood Count', description: 'This is the third card.' },
    { id: 4, title: 'Liver Function Test', description: 'This is the fourth card.' },
    { id: 5, title: 'Thyroid Function Test', description: 'This is the fifth card.' },
    { id: 6, title: 'Vitamin D Test', description: 'This is the sixth card.' },
    { id: 7, title: 'Lipid Profile', description: 'This is the seventh card.' },
    { id: 8, title: 'Blood Glucose Test', description: 'This is the eighth card.' },
    { id: 9, title: 'Urinalysis', description: 'This is the ninth card.' },
    { id: 10, title: 'Electrolyte Panel', description: 'This is the tenth card.' }
];

// CardList component - maintaining original structure while adding hover functionality
const CardList = (className) => {
    // Add state to track which card is being hovered
    const [hoveredCardId, setHoveredCardId] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredCardId(id);
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null);
    };

    return (
        <div className={className}>
            {jsonData.map((item) => (
                <div 
                    key={item.id}
                    className="card-list-item-container"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <CardButton
                        className="card-list-item"
                        title={item.title}
                        onClick={() => alert(`Clicked on ${item.title}`)} // Original onClick handler
                    />
                    <CardDescription
                        title={item.title}
                        description={item.description}
                        isVisible={hoveredCardId === item.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardList;