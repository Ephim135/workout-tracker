import { useState, useEffect } from "react";
import InputNumber from "./InputNumber";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);

  useEffect(() => {
    if (isRunning) {
      // make this intervall stuff here
    }
  }, [isRunning]);

  function start() {
    setIsStarted(true);
    setIsRunning(true);

    formatTime(timeSeconds);
  }
  function stop() {
    setIsRunning(false);
  }
  function pause() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
  }
  function formatTime(time: number) {
    const minutes = time / 60;
    return `00:00:00`;
  }

  // if Timer Did Not start yet display the input field for seconds
  if (!isStarted) {
    return (
      <div className="stopwatch flex items-center justify-center">
        <InputNumber
          timeSeconds={timeSeconds}
          onChange={setTimeSeconds}
        ></InputNumber>
        <button onClick={start} className="btn btn-s">
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="stopwatch flex items-center justify-center">
      <div className="display">{formatTime()}</div>
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
