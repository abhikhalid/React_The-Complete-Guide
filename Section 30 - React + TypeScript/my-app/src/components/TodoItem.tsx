import React from 'react'
import classes from './TodoItem.module.css';

export const TodoItem: React.FC<{text:string}> = (props) => {
  return (
    <li className={classes.item}>
      {props.text}
    </li>
  )
}
