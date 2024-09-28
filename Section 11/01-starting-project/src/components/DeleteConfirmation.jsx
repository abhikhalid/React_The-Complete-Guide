import { useEffect } from "react";
import ProgressBar from "./ProgressBar";


export default function DeleteConfirmation({ onConfirm, onCancel }) {
 
  //If you are using prop or state values in your effect function, you shoudl include them in the dependencies array.
  useEffect(() => {
    console.log(`TIMER SET`);

   const timer = setTimeout(()=>{
      onConfirm();
   },3000);

    //this functon will be called when the component is unmounted.
    //this is useful for cleaning up any side effects that the component may have created.
    //this is useful for unsubscribing from events, clearing timers, or cancelling any network requests.
    //this is useful for cleaning up any resources that the component may have created.
    
    //calls automaticallhy when this effect function runs again or right before this component is removed from the DOM.
    return () => {
      console.log(`Clening up timer`);
      clearTimeout(timer);
    }
  }, [onConfirm]) //when adding function as dependencies, there is a danger of creating infinite loop.
  
  
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar/>
    </div>
  );
}
