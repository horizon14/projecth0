import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';

function App() {

  const [todos,setTodos]=useState([]);
  const [inputValue,setInputValue]=useState('');
  const handleInputChange=(e)=>{
    setInputValue(e.target.value);
  }

  const handleAddTodo=()=>{
    if(inputValue.trim()!==''){
      setTodos([...todos,{id:Date.now(),text:inputValue,completed:false}]);
      setInputValue('');
    }
  }

  const handleDeleteTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id));
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo List</h1>
        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a new todo" />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo)=>(<li key={todo.id}>
            {todo.text}
            <button onClick={()=>handleDeleteTodo(todo.id)}>Delete</button>
          </li>))}
        </ul>
      </header>
    </div>
  );
}

export default App;
