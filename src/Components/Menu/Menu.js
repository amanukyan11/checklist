import "./Menu.css"
import Checklist from "../Checklist/Checklist"
import ProgressBar from '../ProgressBar/ProgressBar';
import {useState} from 'react';

function Menu (props) {
    const [lists, setLists] = useState(props.lists); 
    const [currIndex, setCurrIndex] = useState(0);

    const addList = () => {
        setLists([...lists, '']);
    }
    
    //const removeList() {} this is to be done later

    const handleSubmit = (event) => { //This is the 'New List' button's functionality.
        event.preventDefault();
        addList();

    };

    return( 
    <div className="overall">
        <div className="menuSection">
            <h1 className="leftTop">
                <div className="titles">Menu</div>
            </h1>            
            <div className="menuList">
                {lists.map((list, index) => (
                    <div className="lists">
                        <button className="listNumber" onClick={() => setCurrIndex(index)}>List {index + 1}</button>
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