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
  const [sessionType, setSessionType] = useState("work");
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setSessionCount((prevCount) => prevCount + 1);
      if (sessionType === "work" && sessionCount < 4) {
        setSessionType("break");
        setTime(5 * 60); // 5 minutes break
      } else if (sessionType === "work" && sessionCount === 4) {
        setSessionType("longBreak");
        setTime(15 * 60); // 15 minutes break
        setSessionCount(0);
      } else {
        setSessionType("work");
        setTime(25 * 60); // 25 minutes work
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time, sessionType, sessionCount]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
    setSessionType("work");
    setSessionCount(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div>
        <div>{sessionType}</div>
        <div>{formatTime(time)}</div>
        <button className="buttons" onClick={startTimer}>Start</button>
        <button className="buttons" onClick={pauseTimer}>Pause</button>
        <button className="buttons" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
