import { useRef } from "react";

const NewTodo = () => {
 const todoTextRef = useRef<HTMLInputElement>(null);

 const submitHandler = (event: React.FormEvent) => {
     event.preventDefault();

     const enteredText = todoTextRef.current!.value;

     if(enteredText.trim().length === 0){
        return;
     }
 }


 return (
    <form onSubmit={submitHandler}>
        <label htmlFor="text">Todo text</label>
        <input type="text"  id="text" ref={todoTextRef}/>

        <button>Add Todo</button>
    </form>
 )
}

export default NewTodo;