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
                        Menu
                    </h1>
                    <Menu/>
                </div>
                <div className="mainCenter">
                    <h1 className="centerTop">
                        Checklist
                    </h1>
                    <Checklist />
                    <footer className="centerBottom">
                        <ProgressBar/>
                    </footer>
                </div>
                <div className="mainRight">
                    <Tree/>
                    <Timer/>
                </div>
            </div>
        </div>
    )
}

export default MainPage