import React, { useState, useEffect, useRef } from 'react';
import "./Checklist.css";
const connect = require(`../../connect.js`);

function Checklist(props) {
  const [listid, setListid] = useState(props.list.listid);
  const [listName, setListName] = useState(props.list.name);
	const [tasks, setTasks] = useState(props.list.tasks); //defines a variable tasks and a function setTask that updates using 'useState'
  const [numberOfTasks, setNumberOfTasks] = useState(props.list.numTasks); //used to increment the number of tasks that have been created.
  const [completedTasks, setCompleteTasks] = useState(props.list.completedTasks);
  const [isTextBoxActive, setTextBoxActive] = useState(false); 
  const [isSaved, setIsSaved] = useState(true); 
  const prevID = usePrevious(listid);
  const prevTasks = usePrevious(tasks);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (props.list.listid !== listid){
      setListid(props.list.listid);
      setListName(props.list.name);
      setTasks(props.list.tasks);
      setNumberOfTasks(props.list.numTasks);
      setCompleteTasks(props.list.completedTasks);
    }
    else if (isSaved && !isTextBoxActive && prevID === listid && JSON.stringify(prevTasks) !== JSON.stringify(tasks)){
      updateDB();
    }
  })

  function updateDB() {
    const content = [];
    const checked = [];
    for (let i = 0; i < tasks.length; i++) {
      content.push(tasks[i].text);
      checked.push(tasks[i].isCompleted);
    }
    const vals = [listid, listName, content, checked]
    props.listUpdate(...vals);
    connect.updateChecklist(...vals)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message))
      .finally(() => console.log("Checklist updated"));
  }

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
      const badMsg = 'Something went wrong. List not shared.'
      const goodMsg = `List shared with ${email}.`
      connect.shareList(listid, email)
        .then((res) => {
          if (res["status"] === 1){
            alert(badMsg);
          }  
          else{
            alert(goodMsg);
          }
        })
        .catch((e) => alert(badMsg)); 
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
      setIsSaved(false);
      addTask();
    }
  };

  const crossOutTask = (index) => {
    const taskText = tasks[index].text;
    if (isTextBoxActive){
      return;
    }
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
            onChange={(event) => updateTask(index, {text: event.target.value, isCompleted: task.isCompleted})}
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
          updateDB();
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
