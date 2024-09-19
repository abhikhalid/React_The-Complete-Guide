import React from 'react';

const TabButton = ({ children,isSelected,...props}) => {
    console.log(`TABBUTTON COMPONENT EXECUTING`);
    return (
        <li>
            <button className={isSelected ? 'active' : ''} {...props}>
                {children}
            </button>
        </li>
    );
};

export default TabButton;