import "./Menu.css"
import Checklist from "../Checklist/Checklist"
import ProgressBar from '../ProgressBar/ProgressBar';
import {useState} from 'react';
const connect = require("../../connect");
function Menu (props) {
    const [lists, setLists] = useState(props.lists); //lists is a nested array, every index corresponds to a checklist = [checklist, 0], [checklist, 1]...
    const [currIndex, setCurrIndex] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [curList, setCurList] = useState(null);

    function updateCompleted(newCompleted) {
        if(isNaN(newCompleted)) {
            setCompleted(0);
        }else {
            setCompleted(newCompleted);
        }
    }

    const addList = (index) => {
        let newListId = null;
        const listName = `List ${index}`
        connect.createChecklist(props.userid, listName, [], [])
            .then((res) => {
                console.log(res);
                newListId = res["listid"];
            } )
            .catch((e) => console.log(e.message))
        const newList = {
            listid: newListId,
            name: listName,
            content: [],
            checked: [],
            isSelected: false
        }
        setLists([...lists, newList]);
    }
    
    const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
        event.preventDefault();
        addList();
    };

    
    const removeList = (index) => {//this removes a list from the menu
        const newLists = [...lists];
        newLists.splice(index, 1);
        setLists(newLists);
    };

    const handleListClick = (index) => { //this handles the assigning of isSelected for switching from dot to empty
        setCurrIndex(index);
        setLists(prevLists => prevLists.map((list, i) => {
          if (i === index) {
            return { ...list, isSelected: true };
          } else {
            return { ...list, isSelected: false };
          }
        }));
        console.log(lists[index]);
        const list = lists[index];
        const content = list["content"];
        const checked = list["checked"];
        let newNumTasks = null;
        try {
            newNumTasks = content.length;
        }
        catch(err) {
            newNumTasks = 0;
        }
        console.log(newNumTasks);
        let newTasks = [];
        let newCompletedTasks = 0;
        for (let i = 0; i < newNumTasks; i++) {
          newTasks.push({ "text": content[i], "isCompleted": checked[i] });
          if (checked[i] === true) {
            newCompletedTasks += 1;
          }
        }
        setCurList({
            "tasks": newTasks,
            "numTasks": newNumTasks,
            "completedTasks": newCompletedTasks
        });
      };

    return( 
    <div className="overall">
        <div className="menuSection">
            <h1 className="leftTop">
                <div className="titles">Menu</div>
            </h1>            
            <div className="menuList">
                {lists.map((list, index) => (
                    <div className="lists" key={index}>
                      <button className="removeList" onClick={() => removeList(index)}>X</button>
                      {/* <button className="listNumber" onClick={() => handleListClick(index)}>List {index + 1}</button> */}
                      <input 
                        className="listNumber" 
                        type="text" 
                        value={`List ${index + 1}`} 
                        onChange={() => setCurrIndex(index)} 
                      />
                      {list.isSelected ? (
                        <button className="selectedButton" onClick={() => handleListClick(index)}>•</button>
                    ) : (
                            <button className="emptyButton" onClick={() => handleListClick(index)}>&shy;</button>
                        )}
                    </div>
                ))}
                <div>
                    <form onSubmit={handleSubmit}>
                        <button className="addList" type="submit">New List</button>
                        <button>{currIndex}</button>
                    </form>
                    <p>Completed: {completed}</p>
                </div>
            </div>
        </div>

        <div className="checklistSection"> 
            <h1 className="centerTop">
                <div className="titles">Checklist</div>
            </h1>
            {curList && <Checklist list={curList} completed={completed} updateCompleted={updateCompleted}/>}
            <footer className="centerBottom">
                <ProgressBar completed={completed}/>
            </footer>
        </div>
    </div>
    )
}

export default Menu;
