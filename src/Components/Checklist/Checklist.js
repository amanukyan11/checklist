import React, { useState } from 'react';
import "./Checklist.css";
const connect = require(`../../connect.js`);

function Checklist(props) {
  const [tasks, setTasks] = useState([]); //defines a variable tasks and a function setTask that updates using 'useState'
  const [numberOfTasks, setNumberOfTasks] = useState(0); //used to increment the number of tasks that have been created.
  const [completedTasks, setCompleteTasks] = useState(0);
  const [isTextBoxActive, setTextBoxActive] = useState(false); 
  const [isSaved, setIsSaved] = useState(true); 

  const addTask = () => {   //adds a new task to the 'task' array and uses setTasks to update the 'task'
    //TODO #1: check if the current task value is not empty
    //TODO #2: not show the 'Add task' button until 'save' button is clicked
    setTasks([...tasks, '']);
  };

  function incrementTasks() {
    if (isTextBoxActive && tasks.filter(task => task.text.trim() !== '').length > numberOfTasks) {
      setNumberOfTasks(numberOfTasks + 1);
      setIsSaved(true);
    }
  } 
  
  function shareList() {
    let email = prompt("Enter the email of the person you wish to share with:");
    if (email === null || email === "") {
      alert("No email entered. List not shared");
    }
    else {
      let alertMsg = 'Something went wrong. List not shared.'
      connect.shareList("listID", email)
        .then((res) => alertMsg = `List shared with ${email}.`)
        .catch((e) => console.log(e.detail)); 
      alert(alertMsg);
      setIsSaved(true);
    }
  }

  const updateTask = (index, value) => { //takes in an index and value and creates a new array by copying the current 'task' array. Then newTasks is updated and set with the new index and value.
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index) => { //remove tasks by copying the 'tasks' array into newTasks then using the .splice function the item from the list based on the index is removed. 'tasks' is updated
    if(isSaved){
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      if (numberOfTasks !== 0) {
        setNumberOfTasks(numberOfTasks - 1); 

      }
      if (tasks[index].isCompleted) {
        setCompleteTasks(completedTasks - 1);
      }
      setTasks(newTasks);
    }
  };    

  const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
    event.preventDefault();
    if(isSaved){
      addTask();
      setIsSaved(false);
    }
  };

  const crossOutTask = (index) => {
    const taskText = tasks[index].text;
    if (taskText) {
      const newTasks = [...tasks];
      if (!newTasks[index].isCompleted) {
        newTasks[index] = {...tasks[index], isCompleted: true};
        setCompleteTasks(completedTasks + 1)
      } else {
        newTasks[index] = {...tasks[index], isCompleted: false};
        setCompleteTasks(completedTasks - 1)
      }
      setTasks(newTasks);
    }
  };
  
  return (
    props.updateCompleted(Math.round(completedTasks/numberOfTasks * 100)),
    <div className="checklist">
      {tasks.map((task, index) => (
        <div key={index} className={`checklistTask ${task.isCompleted ? 'completed' : ''}`}> {/* 'completed' is a special case for strikthrough */}
          <button className="deleteButton" onClick={() => removeTask(index)}>X</button>
          <input
            type="text"
            value={task.text}
            onChange={(event) => updateTask(index, {text: event.target.value, isCompleted: false})}
            onFocus={() => setTextBoxActive(true)}
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
        {isTextBoxActive && (
        <button className="saveButton" onClick={() => {
          setTextBoxActive(false)
          incrementTasks();
          }}>Save</button>)}
      </form>
      <div> 
        <button onClick={()=>shareList()}>Share List</button>
      </div>
      <div>
    <p>Number of tasks: {numberOfTasks} Number of completed tasks: {completedTasks} Completed: {props.completed}</p>
      </div>
  </div>
  );
}

export default Checklist;