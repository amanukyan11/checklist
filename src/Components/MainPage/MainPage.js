import "./MainPage.css"
import Timer from '../Timer/Timer';
import Tree from '../Tree/Tree';
import Menu from '../Menu/Menu';
function MainPage () {
    return (
        <div className="MainPage">
            <div className="container">
                <div className="mainLeft">
                    <Menu/>
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