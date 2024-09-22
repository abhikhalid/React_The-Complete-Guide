import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children, buttonCaption },ref){
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                //showModal() is a built-in method provided by dialog element.
                dialog.current.showModal();
           }
       } 
    });

    return createPortal(
        <dialog ref={dialog}>
            {children}
            <form method="dialog">
                <button>{buttonCaption}</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;