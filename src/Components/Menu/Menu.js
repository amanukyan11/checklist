import "./Menu.css"
import Checklist from "../Checklist/Checklist"
import ProgressBar from '../ProgressBar/ProgressBar';
import {useState} from 'react';
//Test
function Menu (props) {
    const [lists, setLists] = useState(props.lists.map(list => ({ checklist: list, value: 0 })));
    const [currIndex, setCurrIndex] = useState(0);
    const [isSelected, setIsSelected] = useState(false);

    const addList = () => {
        setLists([...lists, '']);
    }
    
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
      };
    
    const handleSubmit = (event) => { //This is the 'Add Task' button's functionality.
        event.preventDefault();
        addList();
    };
      
    //checklist accept props, 

    //List 1 (0) --> checklist --> lists array (0)
    //List 2 (1) --> checklsit --> lists array (1)
    
    //add a delete button, and make the selected list have a "o"
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
                </div>
            </div>
        </div>

        <div className="checklistSection"> 
            <h1 className="centerTop">
                <div className="titles">Checklist</div>
            </h1>
            <Checklist list={lists[currIndex]}/>
            <footer className="centerBottom">
                <ProgressBar/>
            </footer>
        </div>
    </div>
    )
}

export default Menu