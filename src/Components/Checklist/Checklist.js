import React, { useState, useEffect, useRef } from 'react';
import "./Checklist.css";
const connect = require(`../../connect.js`);

function Checklist({ list, tasks, setTasks, completed, updateCompleted, listUpdate, isSaved, setIsSaved }) {
  const [listid, setListid] = useState(list.listid);
  const [listName, setListName] = useState(list.name);
  const [numberOfTasks, setNumberOfTasks] = useState(list.numTasks); //used to increment the number of tasks that have been created.
  const [completedTasks, setCompleteTasks] = useState(list.completedTasks);
  const [isTextBoxActive, setTextBoxActive] = useState(false); 
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
    updateCompleted(Math.round(completedTasks/numberOfTasks * 100))

    if (list.listid !== listid){
      setListid(list.listid);
      setListName(list.name);
      setTasks(list.tasks);
      setNumberOfTasks(list.numTasks);
      setCompleteTasks(list.completedTasks);
    }
    else if (isSaved && !isTextBoxActive && prevID === listid && JSON.stringify(prevTasks) !== JSON.stringify(tasks)){
      updateDB();
    }
  }, [])

  function updateDB() {
    const content = [];
    const checked = [];
    for (let i = 0; i < tasks.length; i++) {
      content.push(tasks[i].text);
      checked.push(tasks[i].isCompleted);
    }
    const vals = [listid, listName, content, checked]
    listUpdate(...vals);
    connect.updateChecklist(...vals)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message))
      .finally(() => console.log("Checklist updated"));
  }

  const addTask = () => {   //adds a new task to the 'task' array and uses setTasks to update the 'task'
    setTasks([...tasks, 
      {
        text: '',
        isCompleted: false
      }
    ]);
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
    if (isTextBoxActive) return;

    if (taskText) {
      const newTasks = [...tasks];

      console.log(newTasks[index])
      if (!newTasks[index].isCompleted) {
        newTasks[index] = { text: tasks[index].text, isCompleted: true};
        setCompleteTasks(completedTasks + 1)
      } else {
        newTasks[index] = { text: tasks[index].text, isCompleted: false};
        setCompleteTasks(completedTasks - 1)
      }
      setTasks(newTasks);
      updateDB();
    }
  };
  
  return (
    <div className="checklist">
      {tasks.map((task, index) => (
        <div key={index} className={`checklistTask ${task.isCompleted ? 'completed' : ''}`}> {/* 'completed' is a special case for strikthrough */}
          <button className="deleteButton button2" onClick={() => removeTask(index)}>X</button>
          <input
            className="taskTextBox"
            type="text"
            value={task.text}
            onChange={(event) => updateTask(index, {text: event.target.value, isCompleted: task.isCompleted})}
            onFocus={() => setTextBoxActive(true)}
          />
          {task.isCompleted ? (
            <button className="checkButton button2" onClick={() => crossOutTask(index)}>&#10003;</button>
            ) : (
            <button className="emptyButton button2" onClick={() => crossOutTask(index)}>&shy;</button>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <button className="newTask button" type="submit">Add Task</button>
        
        {isTextBoxActive && (
        <button className="saveButton button" onClick={() => {
          setTextBoxActive(false)
          incrementTasks();
          updateDB();
          }}>Save</button>)}
      </form>
      <div> 
        <button className="button" onClick={()=>shareList()}>Share List</button>
      </div>
      <div>
    <p>Number of tasks: {numberOfTasks} Number of completed tasks: {completedTasks} Completed: {completed}</p>
      </div>
  </div>
  );
}

export default Checklist;
