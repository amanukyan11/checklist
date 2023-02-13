import React, { Component } from 'react';

// function CreateNewProfile() {
//     return (
//         <div>
//             <form>
//                 <label for="username">New Username:</label>
//                 <br/>
//                 <input type="text"></input>
//                 <br/>
//                 <label for="password">New Password:</label>
//                 <br/>
//                 <input type="text"></input>
//                 <br/>
//                 <input type="submit"></input>
//             </form>
//         </div>
//     );
//   }
 
class login extends Component {
  render() {
    return (
        <div style={{backgroundColor:"#A8C3BC", height: "100vh"}}>
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
            <button>Create New Account</button>
      </div>
      </div>
    );
  }
}
 
export default login;
