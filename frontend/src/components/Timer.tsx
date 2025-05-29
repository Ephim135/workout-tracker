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
            setIsStarted(false);
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
    // const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
    // ${String(milliseconds / 10).padStart(2, "0")}
  }

  // if Timer Did Not start yet display the input field for seconds
  if (!isStarted) {
    return (
      <div className="stopwatch flex items-center justify-center gap-2">
        <InputNumber
          timeSeconds={timeSeconds}
          onChange={setTimeSeconds}
        ></InputNumber>
        <button onClick={start} className="btn">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="size-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v18l15-9L5 3z"
            />
          </svg> */}{" "}
          Timer
        </button>
      </div>
    );
  }

  return (
    <div className="stopwatch flex items-center justify-center gap-2">
      <div className="display text-xl font-bold">{formatTime(timeSeconds)}</div>
      <button onClick={stop} className="btn btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          fill="white"
          className="size-[1.2em]"
        >
          <rect
            x="6"
            y="6"
            width="12"
            height="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button onClick={reset} className="btn btn-square p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 21 21"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#FFF"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0 1 1 0 2.5 2.5)"
          >
            <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />

            <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
          </g>
        </svg>
      </button>
    </div>
  );
}

export default Timer;
