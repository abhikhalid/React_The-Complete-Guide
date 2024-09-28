import React, { useEffect, useState } from 'react'

export default function QuestionTimer({timeout, onTimeout}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('I am from first use effect')
    setTimeout(onTimeout,timeout);
  }, [timeout, onTimeout]); //add depenedencies if you use in effect function.
  
  useEffect(() => {
    console.log(`I am from second use effect`);
    setInterval(()=>{
        setRemainingTime((prevRemainingTime) => prevRemainingTime -100);
   });
 }, []);
  
  return (
     <progress id="question-time" max={timeout} value={remainingTime}/>
  )
}
