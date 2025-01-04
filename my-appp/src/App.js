import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask =async () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = async (index) => {
    const response = await axios.delete( 
      "http://localhost:3000/api/tasks/:id"
  ); 
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  useEffect(() => { 
    const loadPost = async () => { 
        // Till the data is fetch using API 
        // the Loading page will show. 
       

        // Await make wait until that 
        // promise settles and return its result 
        const response = await axios.get( 
            "http://localhost:3000/api/tasks"
        ); 

        // After fetching data stored it in posts state. 
        setTasks(response.data); 

        // Closed the loading page 
       console.log(tasks)
    }})
  return (
    <div className="app">
      <header className="header">
        <h1>Tasks for CCtech</h1>
      </header>
      <div className="input-container">
        <input 
        className='input-div'
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className='task'>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;