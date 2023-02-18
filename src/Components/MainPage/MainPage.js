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
                    <Menu/>
                </div>
                <div className="mainCenter">
                    <Checklist/>
                    <ProgressBar/>
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