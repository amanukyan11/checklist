
import "./App.css"
import React, { Component } from "react";
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
function App () {
  const [userid, setUserId] = useState(null);

  function onLogin(new_userid) {
    setUserId(new_userid);
  }

  return (
    <div className = "App">
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin}/>} />
        <Route path="/mainpage" element={<MainPage userid={userid}/>} />
      </Routes>
    </div>
  );
}
 
export default App;