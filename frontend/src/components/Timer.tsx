import { useState, useEffect } from "react";
import InputNumber from "./InputNumber";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function start() {
    if (timeSeconds <= 0) return;
    setIsRunning(true);
    setIsStarted(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setIsStarted(false);
    setTimeSeconds(0);
  }

  function formatTime(time: number) {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}:${String(milliseconds).padStart(3, "0")}`;
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
      <div className="display">{formatTime(timeSeconds)}</div>
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
