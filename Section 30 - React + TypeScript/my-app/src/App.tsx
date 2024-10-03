import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';

function App() {
  // const [todos, setTodos] = useState<Todo[]>([]);

  // const addTodoHandler = (todoText: string) => {
  //   const newTodo = new Todo(todoText);

  //   setTodos((prevTodos)=> {
  //     return prevTodos.concat(newTodo);
  //   });
  // }

  // const removeTodoHandler = (todoId: string) => {
  //   setTodos(prevTodos => {
  //     return prevTodos.filter(todo => todo.id !== todoId);
  //   })
  // }

  return (
      <TodosContextProvider>
      <NewTodo />
      <Todos/>
      </TodosContextProvider>
  );
}

export default App;
