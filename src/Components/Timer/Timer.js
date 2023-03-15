import "./Timer.css"

// function Timer () {  
//     return (
//     <div className="Timer">
//         <img src="http://clipart-library.com/newimages/clip-art-clock-14.png" alt="tree"></img>
//     </div>)
// }

// export default Timer

import React, { useState, useEffect } from "react";

function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("Working Time");
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setSessionCount((prevCount) => prevCount + 1);
      if (sessionType === "Working Time" && sessionCount < 4) {
        setSessionType("Break Time");
        setTime(5 * 60); // 5 minutes Break Time
      } else if (sessionType === "Working Time" && sessionCount === 4) {
        setSessionType("Long Break Time");
        setTime(15 * 60); // 15 minutes break
        setSessionCount(0);
      } else {
        setSessionType("Working Time");
        setTime(25 * 60); // 25 minutes Working Time
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time, sessionType, sessionCount]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
    setSessionType("Working Time");
    setSessionCount(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timerContainer">
      <div className="timerCounter">
        <h1 className="time">{formatTime(time)}</h1>
        <div className="timerButtons">
          <button className="buttons button" onClick={startTimer}>Start</button>
          <button className="buttons button" onClick={pauseTimer}>Pause</button>
          <button className="buttons button" onClick={resetTimer}>Reset</button>
        </div>
        <div>
          <footer className="stateOfTimer">{sessionType}</footer>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
