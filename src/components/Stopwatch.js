import React, { useState, useRef, useEffect } from 'react';

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
    // Change the background color based on the timer value
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

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-white shadow-2xl rounded">
        <div className="text-8xl text-center mb-5">{formatTime(time)}</div>
        <div className="space-x-5 items-center align-center">
          {!running ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={startTimer}
            >
              Start
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={pauseTimer}
            >
              Pause
            </button>
          )}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={stopTimer}
          >
            Stop
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
