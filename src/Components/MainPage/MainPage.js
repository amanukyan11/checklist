import "./MainPage.css"
import ProgressBar from '../ProgressBar/ProgressBar';
import Timer from '../Timer/Timer';
import Tree from '../Tree/Tree';
import Checklist from "../Checklist/Checklist"
import Menu from '../Menu/Menu';
function MainPage () {
    return (
        <div className="MainPage">
            <div className="container">
                <div className="mainLeft">
                    <h1 className="leftTop">
                        <div className="titles">Menu</div>
                    </h1>
                    <Menu/>
                </div>
                <div className="mainCenter">
                    <h1 className="centerTop">
                        <div className="titles">Checklist</div>
                    </h1>
                    <Checklist />
                    <footer className="centerBottom">
                        <ProgressBar/>
                    </footer>
                </div>
                <div className="mainRight">
                    <h1 className="topRight">
                        <div className="titles">Success Sapling</div>
                    </h1>
                    <Tree/>
                    <h1 className="bottomRight">
                        <div className="titles">Pomodoro Timer</div>
                    </h1>
                    <Timer/>
                </div>
            </div>
        </div>
    )
}

export default MainPage