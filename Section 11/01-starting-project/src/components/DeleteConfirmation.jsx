import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
   const interval =  setInterval(() => {
      console.log(`INTERVAL`);
      setRemainingTime(prevTime => prevTime - 10);
    },10);

    return () => {
      console.log(`CLEANING UP INTERVAL`);
      clearInterval(interval);
    }
  }, [])
  

  //If you are using prop or state values in your effect function, you shoudl include them in the dependencies array.
  useEffect(() => {
    console.log(`TIMER SET`);

   const timer = setTimeout(()=>{
      onConfirm();
   },TIMER);

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
      <process value={remainingTime} max={TIMER}/>
    </div>
  );
}
