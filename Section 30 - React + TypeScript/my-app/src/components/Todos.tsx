import React from 'react'

//There is also a special prop, the children prop; and we don't even to know the type of it.
// Which we could find out which type that should be abd addded like this but it will quickly become cumbersome
// it for every component  that  we're defining that is using props. we have to always add those built-in props  to that object and also
// our custom props.

// export default function Todos(props: {items: string[], children}) {


const Todos: React.FC<{items: string[]}> =(props) => {
  return (
    <ul>
        {
           props.items.map((item) => (
           <li key={item}>{item}</li>
           ))}
    </ul>
  )
}

export default Todos;