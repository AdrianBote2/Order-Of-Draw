import React from 'react';
import './chart.css'; // Importing the CSS file for styling

const Chart = () => {
    return (
        <div>
            <ol>
                <li className='white'>
                    <div className='rightLi'>Blood Cultures</div>
                </li>

                <li className='blue'>
                    <div className='rightLi'>Sodium Citrate</div>
                </li>

                <li className='red'>
                    <div className='rightLi'>Clot Activater</div>
                </li>

                <li className='orange'>
                    <div className='rightLi'>SST</div>
                </li>

                <li className='light_green'>
                    <div className='rightLi'>Lithium Heparin</div>
                </li>
                <li className='dark_green'>
                    <div className='rightLi'>Sodium Heparin</div>
                </li>
                <li className='lavender'>
                    <div className='rightLi'>EDTA</div>
                </li>
                <li className='gray'>
                    <div className='rightLi'>Sodium Fluoride</div>
                </li>
                <li className='yellow'>
                    <div className='rightLi'>ACD Solution</div>
                </li>
            </ol>
        </div>
    );
};
export default Chart;