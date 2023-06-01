import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
      setRunning(true);
    }
  };

  const pauseTimer = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const minutes = Math.floor(time / 6000);
      const seconds = Math.floor((time / 100) % 60);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white shadow-2xl rounded">
        <div className="text-8xl text-center mb-5">{formatTime(time)}</div>
        <div className="pt-5 space-x-5 flex justify-center">
          {!running ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={startTimer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={pauseTimer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-pause-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
              </svg>
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={stopTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-stop-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
            </svg>
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={resetTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
