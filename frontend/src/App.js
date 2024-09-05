import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/todos', { text: inputValue, completed: false });
        setTodos([...todos, response.data]);
        setInputValue('');
      } catch (err) {
        setError('Failed to add todo');
      }

    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }

  }

  const handleCompletedTodoStatus = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3000/todos/${id}/completed`)
      const updatedTodo = response.data;
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo))
      if (updatedTodo.completed) {
        setCompletedTodos(prevCompleted => [...prevCompleted, updatedTodo])
      } else {
        setCompletedTodos(prevCompleted => prevCompleted.filter(todo => todo.id !== id))
      }
    } catch (err) {
      setError('Failed to update completed status')
    } finally {
      setLoading(false);
    }
  }

  // const handleCompleteTodo =async (id) => {
  //   setCompletedTodos([...completedTodos, todos.find(todo => todo.id === id)]);
  //   setTodos(todos.filter(todo => todo.id !== id));
  // }
  // const handleRefactorTodo = (id) => {
  //   setCompletedTodos(completedTodos.filter(todo => todo.id !== id))
  //   setTodos([...todos, completedTodos.find(todo => todo.id === id)])
  // }
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Todo List</h1>
        {Loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a new todo" />
          <button onClick={handleAddTodo} disabled={loading}>
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (<li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleCompletedTodoStatus(todo.id)}>Complete</button>
          </li>))}
        </ul>
        <h2>Completed Todos</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleCompletedTodoStatus(todo.id)}>Refactor</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
