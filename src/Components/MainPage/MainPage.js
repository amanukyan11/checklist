import React, {useState, useEffect} from 'react';
import "./MainPage.css"
import Timer from '../Timer/Timer';
import Tree from '../Tree/Tree';
import Menu from '../Menu/Menu';
import {useLocation, Navigate} from 'react-router-dom';
const connect = require('../../connect');

function MainPage () {
    let location = useLocation();
    const [userid, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({
        email: null,
        tree_prog: null,
        lists: null
    });
    const [logout, setLogout] = useState(false);

    const onLogin = (id) => {
        connect.getUserInfo(id)
            .then((res) => setUserInfo(res))
            .catch((e) => {
                console.log(e.message);
            })
    }

    useEffect(() => {
        if (location.state.userid !== userid){
            setUserId(location.state.userid);
            onLogin(location.state.userid);
        }
    }, []);

    const onLogout = () => {
        setLogout(true);
    }

    function updateTreeEXP (experience) {

    }

    return (
        <div className="MainPage">
            <div className="container">
                <div className="mainLeft">
                    {userInfo.lists && <Menu lists={userInfo.lists} userid={userid} updateTreeEXP={updateTreeEXP}/>} 
                </div>
                <div className="mainRight">
                    <div className='right-half right-top'>
                        <div className='half-wrapper'>
                    <h1 className="topRight">
                        <div className="titles">Success Sapling</div>
                    </h1>
                    {userInfo.tree_prog !== null && <Tree prog={userInfo.tree_prog}/>}
                        </div>
                    </div>
                    <div className='right-half right-bottom'>
                        <div className='half-wrapper'>
                    <h1 className="bottomRight">
                        <div className="titles">Pomodoro Timer</div>
                    </h1>
                    <Timer/>
                    <br/>
                    <div>
                        <button className="button" onClick={onLogout}>Logout</button>
                        {logout && <Navigate to="/"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage