
import "./App.css"
import React, { Component } from "react";
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login"
 
function App () {
  return (
    <div className = "App">
      {/* TO SWITCH BETWEEN LOGIN AND MAIN PAGE JUST COMMENT OUT THE ONE YOU DONT WANT TO EDIT */}
      <MainPage />
      {/* <Login /> */} 
    </div>
  );
}
 
export default App;