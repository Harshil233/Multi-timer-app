import React from "react";

const fmt = (s) => {
  const h = Math.floor(s / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

const TimerItem = ({
  timer,
  startTimer,
  pauseTimer,
  resetTimer,
  deleteTimer,
}) => {
  const pct = (timer.remaining / timer.duration) * 100;

  return (
    <div className="timer-item">
      <div className="timer-details">
        <h4>{timer.name}</h4>
        <p>Remaining: {fmt(timer.remaining)}</p>
        <p>Status: {timer.status}</p>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${pct}%` }}></div>
        </div>
      </div>
      <div className="timer-controls">
        <button
          onClick={() => startTimer(timer.id)}
          title="Start"
          style={{
            opacity: `${timer.remaining == 0 ? "0.5" : "1"}`,
            pointerEvents: `${timer.remaining == 0 ? "none" : ""}`,
          }}
        >
          ▶️
        </button>
        <button
          onClick={() => pauseTimer(timer.id)}
          title="pause"
          style={{
            opacity: `${timer.remaining == 0 ? "0.5" : "1"}`,
            pointerEvents: `${timer.remaining == 0 ? "none" : ""}`,
          }}
        >
          ⏸️
        </button>
        <button onClick={() => resetTimer(timer.id)} title="Reset">
          🔄
        </button>
        <button onClick={() => deleteTimer(timer.id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TimerItem;
