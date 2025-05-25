import { useState, useRef, useEffect } from "react";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0); // currentTime

  useEffect(() => {}, [isRunning]);

  function start() {}
  function stop() {}
  function reset() {}
  function formatTime() {
    return `00:00:00`;
  }

  return (
    <div className="stopwatch flex items-center justify-center">
      <div className="display">{formatTime()}</div>
      <button onClick={start} className="btn btn-s">
        Start
      </button>
      <button onClick={stop} className="btn btn-s">
        Stop
      </button>
      <button onClick={reset} className="btn btn-s">
        Reset
      </button>
    </div>
  );
}

export default Timer;
