import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({children, open, onClose, className = ''}) {
  const dialog = useRef(); 

  useEffect(() => {
    const modal = dialog.current;
    if(open){
        modal.showModal();
    }

    return () => modal.close();
  }, [open]);
  
    

  // I want to output it with portal feature React offers  so that we can use this Modal component from anywhere in our component tree
  // But we'll always inject the dialogue when it's visible in a specific area of the real DOM

  // onCLose will trigger if use prsses on ESC key or clicks outside the modal
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
        {children}
    </dialog>,
  document.getElementById('modal'));
}
