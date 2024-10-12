import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li  onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

const  CounterHistory = ({ history }) =>{
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {history.map((count,index) => (
        // we should not use index as key, because it  flashes all the elenenets when we add a new element
        // <HistoryItem key={index} count={count.value} /> 
        // we should use count.id as key to avoid flashing of elements when we add a new element 
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}

export default CounterHistory;

