import React from 'react';

const Recherche = ({ onDateChange }) => {
    const handleDateClick = (date) => {
        onDateChange(date); // Met à jour la date sélectionnée dans Login.js
    };

    return (
        <div className='recherche'>
        <button onClick={() => handleDateClick('2025-02-11')}>11.02.2025</button>
        <button onClick={() => handleDateClick('2025-02-14')}>14.02.2025</button>
        <button onClick={() => handleDateClick('2025-02-18')}>18.02.2025</button>
        <button onClick={() => handleDateClick('2025-02-19')}>19.02.2025</button>
        </div>
    );
};

export default Recherche;

