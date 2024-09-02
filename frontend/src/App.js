import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleCompleteTodo = (id) => {
    setCompletedTodos([...completedTodos, todos.find(todo => todo.id === id)]);
    setTodos(todos.filter(todo => todo.id !== id));
  }
  const handleRefactorTodo = (id) => {
    setCompletedTodos(completedTodos.filter(todo => todo.id !== id))
    setTodos([...todos, completedTodos.find(todo => todo.id === id)])
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
          {todos.map((todo) => (<li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleCompleteTodo(todo.id)}>Complete</button>
          </li>))}
        </ul>
        <h2>Completed Todos</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleRefactorTodo(todo.id)}>Refactor</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
