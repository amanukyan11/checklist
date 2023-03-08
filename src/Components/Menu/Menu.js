import "./Menu.css"
import Checklist from "../Checklist/Checklist"
import ProgressBar from '../ProgressBar/ProgressBar';

function Menu () {
    return( 
    <div className="overall">
        <div className="menuSection">
            <h1 className="leftTop">
                <div className="titles">Menu</div>
            </h1>
            
            <div className="menuList">
                <div className="lists">
                    <button className="listNumber">List 1</button>
                </div>
                <div>
                    <button className="addList">New List</button>
                </div>
            </div>
        </div>

        <div className="checklistSection"> 
            <h1 className="centerTop">
                <div className="titles">Checklist</div>
            </h1>
            <Checklist />
            <footer className="centerBottom">
                <ProgressBar/>
            </footer>
        </div>
    </div>
    )
}

export default Menu