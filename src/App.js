import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';

function App() {

  const [todos,setTodos]=useState([]);
  const [inputValue,setInputValue]=useState('');
  const handleInputChange=(e)=>{
    setInputValue(e.target.value);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my react learning track</h1>
        <p>I am learning react</p>
        <ul>
          <li>React</li>
          <li>Angular</li>
          <li>Vue</li>
        </ul>
        <a
        className="App-link"
        href="https://github.com/horizon14"
        target="_blank"
        rel="noopener noreferrer">
          查看我的Github
        </a>
      </header>
    </div>
  );
}

export default App;
