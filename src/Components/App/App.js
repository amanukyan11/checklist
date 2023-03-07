
import "./App.css"
import React, { Component } from "react";
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login"
 
function App () {
  return (
    <div className = "App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </div>
  );
}
 
export default App;