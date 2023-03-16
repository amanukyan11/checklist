import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./ExistingUser.css"
import {authenticateUser} from "../../connect"
import { Navigate } from "react-router-dom";

class existinguser extends Component {
  constructor( props ){
    super( props );
    this.submit = this.submit.bind(this);
    this.state = {
      userid: null
    };
  }
  submit = event => {
    event.preventDefault();
    const username = document.getElementById("loginuser").elements[0].value;
    const password = document.getElementById("loginuser").elements[1].value;
    authenticateUser(username, password)
      .then((res) => {
        if (res["userid"] === null) {
          alert("Wrong password. Please try again!");
        }
        else {
          this.setState({userid: res["userid"]});
        }
      
      })
      .catch((e) => console.log(e.message));
  };
  render() {
    console.log(this.state.user)
    return (
        <div style={{backgroundColor:"#A8C3BC", height: "60vh"}}>
        <div>
            <h1 className="websiteTitle" style={{padding: "100px", width: "fit-content", margin:"auto"}}>Green Agenda: A Nature-Inspired To-Do List</h1>
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
            {this.state.userid && <Navigate to="/mainpage" state={this.state}/>}
            <br/>
      </div>
      </div>
    );
  }
}
 
export default existinguser;
