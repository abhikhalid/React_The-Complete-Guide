import React, { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

const NewProject = ({ onAdd, onCancel }) => {
    // you can use refs to connect them to HTML elements and then interact with those elements.
    const modal = useRef();
   
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        //validation...
        if (enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === '') {
            //show the error modal
            modal.current.open();
            return;
        }


        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }


    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="my-4 text-xl font-bold text-stone-700">Invalid Input</h2>
                <p className='mb-4 text-stone-600'>Opps ... look like you forgot to enter a valid value.</p>
                <p className='mb-4 text-stone-600'>Please make sure you provide a valid value for every input field.</p>
            </Modal>

            <div className="w-[35rem] mt-16">
                <menu className="flex justify-end gap-4 my-4 item-center">
                    <li>
                        <button
                            className='text-stone-800 hover:text-stone-950'
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={title} label="Title" />
                    <Input ref={description} label="Description" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />
                </div>
            </div>
        </>
    );
};

export default NewProject;