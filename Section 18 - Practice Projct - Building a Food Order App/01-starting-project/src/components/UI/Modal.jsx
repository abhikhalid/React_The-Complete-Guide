import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({children, open, className = ''}) {
  const dialog = useRef(); 

  useEffect(() => {
    if(open){
        dialog.current.showModal();
    }
  }, [open]);
  
    

  // I want to output it with portal feature React offers  so that we can use this Modal component from anywhere in our component tree
  // But we'll always inject the dialogue when it's visible in a specific area of the real DOM
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
        {children}
    </dialog>,
  document.getElementById('modal'));
}
