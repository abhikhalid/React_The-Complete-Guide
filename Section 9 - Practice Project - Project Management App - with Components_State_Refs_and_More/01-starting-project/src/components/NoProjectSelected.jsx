import React from 'react';
import noProjectImage from '../assets/no-projects.png';
import Button from './Button';

const NoProjectSelected = () => {
    return (
        <div className="w-2/3 mt-24 text-center">
            <img
                src={noProjectImage}
                alt="an empty task list"
                className='object-contain w-16 h-16 mx-auto' />

            <h2 className="my-4 text-xl font-bold text-stone-500">No Project Selected</h2>
            <p className='mb-4 text-stone-400'>Select a project or get started with a new one.</p>
            <p className='mt-8'>
                <Button>Create new project</Button>
            </p>
        </div>
    );
};

export default NoProjectSelected; <img src="" alt="" />