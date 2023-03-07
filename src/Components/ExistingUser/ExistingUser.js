import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./ExistingUser.css"
import getUserInfo from '../../connect.js'
import authenticateUser from '../../connect.js'
import { Navigate } from 'react-router-dom';


class existinguser extends Component {
  submit = () => {
    var x = document.getElementById("loginuser").elements[0].value;
    var y = getUserInfo(x);
    if(y != null){
      var z = authenticateUser(x, document.getElementById("loginuser").elements[1].value);
    }
    if (y == true){
      <Navigate to="/mainpage" />
    }
    else {
      alert("Wrong Username/Password. Please try again!");
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
                <label for="username">Username:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <label for="password">Password:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <input type="submit" id="loginuser" onclick="submit()"></input>
            </form>
            <br/>
      </div>
      </div>
    );
  }
}
 
export default existinguser;
