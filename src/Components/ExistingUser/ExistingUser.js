import React, { Component, forwardRef, useImperativeHandle, useRef  } from 'react';
import "./ExistingUser.css"

class existinguser extends Component {
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
                <input type="submit"></input>
            </form>
            <br/>
      </div>
      </div>
    );
  }
}
 
export default existinguser;
