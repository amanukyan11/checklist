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

  const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
    event.preventDefault();
    addTask();
  };

  const crossOutTask = (index) => { //using the 'task' array go to the index and mark the task as 'true'
    const newTasks = [...tasks];
    newTasks[index] = {...tasks[index], isCompleted: true};
    setTasks(newTasks);
  };
  
  return (
    <div className="checklist">
      {tasks.map((task, index) => (
        <div key={index} className={`checklist-task ${task.isCompleted ? 'completed' : ''}`}> {/* 'completed' is a special case for strikthrough */}
          <button className="deleteButton" onClick={() => removeTask(index)}>X</button>
          <input
            type="text"
            value={task.text}
            onChange={(event) => updateTask(index, {text: event.target.value, isCompleted: false})}
          />
          {task.isCompleted ? (
          <button className="checkButton" onClick={() => crossOutTask(index)}>&#10003;</button>
          ) : (
          <button className="emptyButton" onClick={() => crossOutTask(index)}>&shy;</button>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <button className="newTask" type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Checklist;