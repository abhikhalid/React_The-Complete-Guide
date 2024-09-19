import React from 'react';

const Section = ({ title,id,children}) => {
    return (
        <section id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    );
};

export default Section;