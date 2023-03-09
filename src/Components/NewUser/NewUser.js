import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./NewUser.css"
import { Navigate } from 'react-router-dom';
import {authenticateUser, addUser} from "../../connect"


class newuser extends Component {
  constructor( props ){
    super( props );
    this.submit2 = this.submit2.bind(this);
    this.state = {
      userid:null
    };
  }
  submit2 = event => {
    event.preventDefault();
    const username = document.getElementById("login2user").elements[0].value;
    const password = document.getElementById("login2user").elements[1].value;
    addUser(username, password)
      .then((res) => {
        const id = res["userid"];
        if(id === null){
          alert("That username already exists.");
        }
        else{
          this.setState({userid: id});
        }
      
      
      })
      .catch((e) => console.log(e.message));
    
  };

  render() {
    return (
        <div style={{backgroundColor:"#A8C3BC", height: "60vh"}}>
        <div>
            <h1 style={{padding: "100px", width: "fit-content", margin:"auto"}}>Green Agenda: A Nature-Inspired To-Do List</h1>
        </div>
        <div style={{width: "fit-content", margin:"auto"}}>
        <form id="login2user" onSubmit ={this.submit2}{...(e) => {e.preventDefault(); e.stopPropagation();}}>
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
            {this.state.userid && <Navigate to="/mainpage" state={this.state} />}
            <br/>
      </div>
      </div>
    );
  }
}

export default newuser;
