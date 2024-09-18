import React from 'react';

const TabButton = ({ children, onClick, isSelected }) => {
    console.log(`TABBUTTON COMPONENT EXECUTING`);
    return (
        <li>
            <button className={isSelected ? 'active' : ''} onClick={onClick}>
                {children}
            </button>
        </li>
    );
};

export default TabButton;