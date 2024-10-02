import React from 'react'

export const TodoItem: React.FC<{text:string}> = (props) => {
  return (
    <li>{props.text}</li>
  )
}
