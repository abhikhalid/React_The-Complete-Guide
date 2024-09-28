import React,{useState,useEffect} from 'react'

const TIMER = 3000;

function ProgressBar() {
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

  return (
        <progress value={remainingTime} max={TIMER}/>
  )
}

export default ProgressBar