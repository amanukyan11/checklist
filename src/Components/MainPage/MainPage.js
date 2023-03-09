import React, {useState, useEffect} from 'react';
import "./MainPage.css"
import ProgressBar from '../ProgressBar/ProgressBar';
import Timer from '../Timer/Timer';
import Tree from '../Tree/Tree';
import Checklist from "../Checklist/Checklist"
import Menu from '../Menu/Menu';
import {useLocation} from 'react-router-dom';
const connect = require('../../connect');

function MainPage () {
    let location = useLocation();
    const [userid, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({
        email: null,
        tree_prog: null,
        lists: null
    });

    const onLogin = (id) => {
        connect.getUserInfo(id)
            .then((res) => setUserInfo(res))
            .catch((e) => {
                console.log(e.message);
            })
    }

    useEffect(() => {
        setUserId(location.state.userid);
        onLogin(location.state.userid);
    });

    return (
        <div className="MainPage">
            <div className="container">
                <div className="mainLeft">
                    <h1 className="leftTop">
                        <div className="titles">Menu</div>
                    </h1>
                    {userInfo.lists && <Menu lists={userInfo.lists}/>}
                </div>
                <div className="mainCenter">
                    <h1 className="centerTop">
                        <div className="titles">Checklist</div>
                    </h1>
                    {userInfo.lists && <Checklist lists={userInfo.lists}/>}
                    <footer className="centerBottom">
                        {userInfo.lists && <ProgressBar/>}
                    </footer>
                </div>
                <div className="mainRight">
                    <h1 className="topRight">
                        <div className="titles">Success Sapling</div>
                    </h1>
                    {userInfo.tree_prog && <Tree prog={userInfo.tree_prog}/>}
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