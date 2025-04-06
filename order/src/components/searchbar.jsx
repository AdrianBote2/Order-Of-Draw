import React from 'react';
import './searchbar.css'; // Importing the CSS file for styling
import eyeglass from '../assets/eyeglassTransparent.png'; // Importing the eyeglass image

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <button>
                <img src={eyeglass} alt="Search" />
            </button>
            <input type="text" placeholder="Search..." />
        </div>
    );
};

export default SearchBar;