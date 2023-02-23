import React, { useState } from 'react';
import "./Checklist.css"

function Checklist() {
  const [tasks, setTasks] = useState([]); //defines a variable tasks and a function setTask that updates using 'useState'
  const [numberOfTasks, setNumberOfTasks] = useState(0); //used to incrament the number of tasks that have been created.
  const [completedTasks, setCompleteTasks] = useState(0);

  const addTask = () => {   //adds a new task to the 'task' array and uses setTasks to update the 'task'
    //TODO #1: check if the current task value is not empty
    //TODO #2: not show the 'Add task' button until 'save' button is clicked
    setTasks([...tasks, '']);
  };

  function incramentTasks () {
    setNumberOfTasks(numberOfTasks + 1);
  }

  function incramentCompletedTasks () {
    setCompleteTasks(completedTasks + 1);
  }

  const updateTask = (index, value) => { //takes in an index and value and creates a new array by copying the current 'task' array. Then newTasks is updated and set with the new index and value.
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index) => { //remove tasks by copying the 'tasks' array into newTasks then using the .splice function the item from the list based on the index is removed. 'tasks' is updated
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setNumberOfTasks(numberOfTasks - 1); 
    setTasks(newTasks);
  };    

  const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
    event.preventDefault();
    addTask();
  };

  const crossOutTask = (index) => { //using the 'task' array go to the index and mark the task as 'true'
    const newTasks = [...tasks];
    if (!newTasks[index].isCompleted) { //by default is completed is false
      newTasks[index] = {...tasks[index], isCompleted: true};
      setCompleteTasks(completedTasks + 1)
    } else {
      newTasks[index] = {...tasks[index], isCompleted: false};
      setCompleteTasks(completedTasks - 1)
    }
    setTasks(newTasks);
  };
  
  return (
    <div className="checklist">
      {tasks.map((task, index) => (
        <div key={index} className={`checklistTask ${task.isCompleted ? 'completed' : ''}`}> {/* 'completed' is a special case for strikthrough */}
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
        <button className="newTask" type="submit" onClick={incramentTasks}>Add Task</button>
      </form>
      <div>
    <p>Number of tasks: {numberOfTasks} Number of completed tasks: {completedTasks}</p>
    {/* Rest of your JSX */}
  </div>
    </div>
  );
}

export default Checklist;


//Add a save button
//Be able to un-check box
//*add a task counter 