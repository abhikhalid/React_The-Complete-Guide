import React from 'react';

const TabButton = ({ children, onClick }) => {
    console.log(`TABBUTTON COMPONENT EXECUTING`);
    return (
        <li>
            <button onClick={onClick}>
                {children}
            </button>
        </li>
    );
};

export default TabButton;