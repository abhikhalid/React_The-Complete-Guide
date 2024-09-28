import {  useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({open,children,onClose}) {
  const dialog = useRef();

  //Effect dependecies are simply prop or state values that are used inside of the effect function.
  //In addition, other effect dependencies would be functions or context values that depened on or use state or props.
  //any other values are not considered as dependencies. because useEffect only cares about dependencies that would cause the component function to execute again. 

  useEffect(() => {
    if(open)
    {
      dialog.current.showModal();
    }else{
      dialog.current.close();
    }
  }, [open]);
  

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
