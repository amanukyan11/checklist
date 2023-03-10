
import "./App.css"
import React, { Component, useState } from "react";
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
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