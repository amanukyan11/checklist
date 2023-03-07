import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./NewUser.css"
import { Navigate } from 'react-router-dom';
import getUserInfo from "../../connect.js"
import addUser from "../../connect.js"

class newuser extends Component {
  submit = () => {
    var x = document.getElementById("loginuser").elements[0].value;
    var y = getUserInfo(x);
    if(y != null){
      alert("That username/password already exists.");
    }
    else{
      addUser(x, document.getElementById("loginuser").elements[1].value);
      <Navigate to="/mainpage" />
    }
  }
  render() {
    return (
        <div style={{backgroundColor:"#A8C3BC", height: "60vh"}}>
        <div>
            <h1 style={{padding: "100px", width: "fit-content", margin:"auto"}}>Green Agenda: A Nature-Inspired To-Do List</h1>
        </div>
        <div style={{width: "fit-content", margin:"auto"}}>
        <form>
                <label for="username">New Username:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <label for="password">New Password:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <input type="submit"></input>
            </form>
            <br/>
      </div>
      </div>
    );
  }
}

export default newuser;
