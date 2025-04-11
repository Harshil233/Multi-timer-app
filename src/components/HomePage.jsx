import React from "react";
import { useTimers } from "../contexts/TimerContext";
import TimerForm from "./TimerForm";
import TimerList from "./TimerList";

export default function HomePage() {
  const {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    bulkAction,
  } = useTimers();

  return (
    <>
      <TimerForm addTimer={addTimer} />
      <TimerList
        timers={timers}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        deleteTimer={deleteTimer}
        bulkAction={bulkAction}
      />
    </>
  );
}
