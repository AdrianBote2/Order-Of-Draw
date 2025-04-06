import React from 'react';
import CardButton from './cardButton'; // Importing the CardButton component
import './cardList.css'; // Importing the CSS file for styling

// Example JSON data
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

//<CardButton title="Card 1" onClick={() => alert('Card 1 clicked!')} />
// CardList component
const CardList = (className) => {
    return (
        <div className={className}>
            {jsonData.map((item) => (
                <CardButton
                    key={item.id}
                    className="card-list-item"
                    title={item.title}
                    onClick={() => alert(`Clicked on ${item.title}`)} // Example onClick handler
                />
            ))}
        </div>
    );
};

export default CardList;
