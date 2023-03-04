import React, { useState } from 'react';
import "./Checklist.css";
const connect = require(`../../connect.js`);

function Checklist() {
  const [tasks, setTasks] = useState([]); //defines a variable tasks and a function setTask that updates using 'useState'
  const [numberOfTasks, setNumberOfTasks] = useState(0); //used to incrament the number of tasks that have been created.
  const [completedTasks, setCompleteTasks] = useState(0);
  const [isTextBoxActive, setTextBoxActive] = useState(false);
  const listID = "9f5f0dad-1324-4b62-a334-e131700f7603"; // TEMPORARY LISTID since listID is not stored yet
  // before testing, query db: INSERT INTO checklists (listid) VALUES ('9f5f0dad-1324-4b62-a334-e131700f7603'::uuid);
  const listName = "Test List"; // TEMPORARY LISTNAME since listname is not stored yet
  const addTask = () => {   //adds a new task to the 'task' array and uses setTasks to update the 'task'
    //TODO #1: check if the current task value is not empty
    //TODO #2: not show the 'Add task' button until 'save' button is clicked
    setTasks([...tasks, '']);
  };

  function incramentTasks() {
    const nonEmptyTasks = tasks.filter(task => task.text.trim() !== '').length
    if (isTextBoxActive && nonEmptyTasks > 0) {
      setNumberOfTasks(nonEmptyTasks);
    }
  }  

  function shareList() {
    let email = prompt("Enter the email of the person you wish to share with:");
    if (email === null || email === "") {
      alert("No email entered. List not shared");
    }
    else {
      let alertMsg = 'Something went wrong. List not shared.'
      connect.shareList(listID, email)
        .then((res) => alertMsg = `List shared with ${email}.`)
        .catch((e) => console.log(e.message)); 
      alert(alertMsg);
    }
  }

  const updateTask = (index, value) => { //takes in an index and value and creates a new array by copying the current 'task' array. Then newTasks is updated and set with the new index and value.
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index) => { //remove tasks by copying the 'tasks' array into newTasks then using the .splice function the item from the list based on the index is removed. 'tasks' is updated
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    if (numberOfTasks !== 0) {
      setNumberOfTasks(numberOfTasks - 1); 
    }
    if (tasks[index].isCompleted) {
      setCompleteTasks(completedTasks - 1);
    }
    setTasks(newTasks);
  };    

  const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
    event.preventDefault();
    addTask();
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
  
  function updateDB() {
    const content = [];
    const checked = [];
    for (let i = 0; i < tasks.length; i++) {
      content.push(tasks[i].text.trim());
      checked.push(tasks[i].isCompleted);
    }
    connect.updateChecklist(listID, listName, content, checked)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message))
      .finally(() => console.log("Checklist updated"));
  }

  return (
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
          incramentTasks();
          updateDB();
          }}>Save</button>)}
      </form>
      <div> 
        <button onClick={()=>shareList()}>Share List</button>
      </div>
      <div>
    <p>Number of tasks: {numberOfTasks} Number of completed tasks: {completedTasks}</p>
  </div>
    </div>
  );
}

export default Checklist;


/*Add a save button 
  -when text box is clicked, add a new button next to 'Add Task' **DONE**
  -Only save and update number of tasks counter when 'Save' button is clicked **DONE**
*/
//Be able to un-check box **DONE**
//add a task counter **DONE**

/*ISSUES
-Should not be able to click "Add Task" if the 'Save' button has not been clicked AND the text box must be filled with something
-When a completed task is removed, decrease "completedTask" counter **DONE**
-Cannot click check box if task is empty **DONE**
-If text box is empty, clicking Save should NOT update "numberOfTasks"
-If you already have a task in text box and you have clicked 'Save' updating the "numberOfTasks" counter, editing it and clicking save should NOT increase counter.
-If the user enters text and clicks off before hitting Save the text should be deleted
*/

//TODO
//-add a 'check all' button that deletes all the compelted tasks, and gives that info to the tree, call the backend tree function
//-when 'save' is clicked, call the backend function to update with the text and bool
