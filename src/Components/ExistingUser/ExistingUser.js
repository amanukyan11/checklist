import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./ExistingUser.css"
import {getUserInfo, authenticateUser} from "./connect"
import { Navigate } from "react-router-dom";

class existinguser extends Component {
  constructor( props ){
    super( props );
    this.submit = this.submit.bind(this);
    this.state = {
      user:false
    };
  }
  submit = event => {
    event.preventDefault();
    var x = document.getElementById("loginuser").elements[0].value;
    var promise = false;
    getUserInfo.then(function() {
      promise = true;
    });
    if(promise == true){
      var z = authenticateUser(x, document.getElementById("loginuser").elements[1].value);
      if (z == true){
        this.setState({ user:true })
      }
      else{
        alert("Wrong password. Please try again!");
      }
    }
    else{
      alert("This account does not appear to exist. Please try again!");
    }
  };
  render() {
    console.log(this.state.user)
    return (
        <div style={{backgroundColor:"#A8C3BC", height: "60vh"}}>
        <div>
            <h1 style={{padding: "100px", width: "fit-content", margin:"auto"}}>Green Agenda: A Nature-Inspired To-Do List</h1>
        </div>
        <div style={{width: "fit-content", margin:"auto"}}>
            <form id="loginuser" onSubmit ={this.submit}{...(e) => {e.preventDefault(); e.stopPropagation();}}>
                <label for="username">Username:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <label for="password">Password:</label>
                <br/>
                <input type="text"></input>
                <br/>
                <input type="submit"></input>
            </form>
            {this.state.user && <Navigate to="/mainpage" />}
            <br/>
      </div>
      </div>
    );
  }
}
 
export default existinguser;
