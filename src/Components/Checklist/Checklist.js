import React, { useState } from 'react';
import "./Checklist.css"

function Checklist() {
  const [tasks, setTasks] = useState([]); //defines a variable tasks and a function setTask that updates using 'useState'

  const addTask = () => {   //adds a new task to the 'task' array and uses setTasks to update the 'task'
    setTasks([...tasks, '']);
  };

  const updateTask = (index, value) => { //takes in an index and value and creates a new array by copying the current 'task' array. Then newTasks is updated and set with the new index and value.
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index) => { //remove tasks by copying the 'tasks' array into newTasks then using the .splice function the item from the list based on the index is removed. 'tasks' is updated
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };    

  const handleSubmit = (event) => { //This is the 'Add Task' button.
    event.preventDefault();
    addTask();
  };

  const crossOutTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = {...tasks[index], isCompleted: true};
    setTasks(newTasks);
  };
  

  return (
    <div className="checklist">
      {tasks.map((task, index) => (
        <div key={index} className={`checklist-task ${task.isCompleted ? 'completed' : ''}`}>
          <button onClick={() => removeTask(index)}>X</button>
          <input
            type="text"
            value={task.text}
            onChange={(event) => updateTask(index, {text: event.target.value, isCompleted: false})}
          />
          <button onClick={() => crossOutTask(index)}>{task.isCompleted ? '\u2713' : ''}</button>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Checklist;