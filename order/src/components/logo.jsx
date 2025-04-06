import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className="logo">
            <img 
                src={logo}
                alt="Company Logo" 
                style={{height: '10vh' }} 
            />
        </div>
    );
};

export default Logo;