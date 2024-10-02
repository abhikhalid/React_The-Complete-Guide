import React from 'react'
import Todo from '../models/todo';

//There is also a special prop, the children prop; and we don't even to know the type of it.
// Which we could find out which type that should be abd addded like this but it will quickly become cumbersome
// it for every component  that  we're defining that is using props. we have to always add those built-in props  to that object and also
// our custom props.

// export default function Todos(props: {items: string[], children}) {


const Todos: React.FC<{items: Todo[]}> =(props) => {
  return (
    <ul>
        {
           props.items.map((item) => (
            <li key={item.id}>{item.text}</li>
           ))}
    </ul>
  )
}

export default Todos;