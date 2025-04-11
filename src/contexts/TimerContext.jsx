import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const STORAGE = "timer_storage";
const HISTORY = "timer_history";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timers, setTimers] = useLocalStorage(STORAGE, []);
  const [history, setHistory] = useLocalStorage(HISTORY, []);
  const [modalData, setModalData] = useState(null);
  const [halfwayModalData, setHalfwayModalData] = useState(null);
  const [halfwayProgressValue, setHalfwayProgressValue] = useState(100);

  const timerIntervals = useRef({});
  const halfwayModalTimeout = useRef();
  const progressInterval = useRef();

  useEffect(() => {
    if (!halfwayModalData) return;
    setHalfwayProgressValue(100);

    const TOTAL = 5000;
    const INTERVAL = 50;
    const steps = TOTAL / INTERVAL;
    const dec = 100 / steps;

    progressInterval.current = setInterval(() => {
      setHalfwayProgressValue((v) => Math.max(0, v - dec));
    }, INTERVAL);

    halfwayModalTimeout.current = setTimeout(() => {
      setHalfwayModalData(null);
    }, TOTAL);

    return () => {
      clearTimeout(halfwayModalTimeout.current);
      clearInterval(progressInterval.current);
    };
  }, [halfwayModalData]);

  const addTimer = (t) => setTimers((ts) => [...ts, t]);
  const updateTimer = (id, data) =>
    setTimers((ts) => ts.map((t) => (t.id === id ? { ...t, ...data } : t)));

  const deleteTimer = (id) => {
    clearInterval(timerIntervals.current[id]);
    setTimers((ts) => ts.filter((t) => t.id !== id));
  };

  const startTimer = (id) => {
    const t = timers.find((t) => t.id === id);
    if (!t || t.status === "Running" || t.status === "Completed") return;

    updateTimer(id, { status: "Running" });

    timerIntervals.current[id] = setInterval(() => {
      setTimers((prev) =>
        prev.map((x) => {
          if (x.id !== id || x.status !== "Running") return x;
          const rem = x.remaining - 1;

          if (
            x.halfwayAlert &&
            !x.halfwayAlertTriggered &&
            rem === Math.floor(x.duration / 2)
          ) {
            setHalfwayModalData({ name: x.name });
            return { ...x, halfwayAlertTriggered: true, remaining: rem };
          }

          if (rem <= 0) {
            clearInterval(timerIntervals.current[id]);
            setHistory((h) => [
              ...h,
              {
                name: x.name,
                category: x.category,
                duration: x.duration,
                completedAt: new Date().toLocaleString(),
              },
            ]);
            setModalData({ name: x.name });
            return { ...x, remaining: 0, status: "Completed" };
          }

          return { ...x, remaining: rem };
        })
      );
    }, 1000);
  };

  const pauseTimer = (id) => {
    updateTimer(id, { status: "Paused" });
    clearInterval(timerIntervals.current[id]);
  };

  const resetTimer = (id) => {
    clearInterval(timerIntervals.current[id]);
    setTimers((ts) =>
      ts.map((t) =>
        t.id === id
          ? {
              ...t,
              remaining: t.duration,
              status: "Paused",
              halfwayAlertTriggered: false,
            }
          : t
      )
    );
  };

  const bulkAction = (category, action) => {
    timers
      .filter((t) => t.category === category)
      .forEach((t) => {
        if (action === "start") startTimer(t.id);
        if (action === "pause") pauseTimer(t.id);
        if (action === "reset") resetTimer(t.id);
      });
  };

  const clearHistory = () => setHistory([]);

  const closeHalfwayModal = () => {
    clearTimeout(halfwayModalTimeout.current);
    clearInterval(progressInterval.current);
    setHalfwayModalData(null);
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        history,
        modalData,
        setModalData,
        halfwayModalData,
        halfwayProgressValue,
        closeHalfwayModal,
        addTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        deleteTimer,
        bulkAction,
        clearHistory,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimers = () => useContext(TimerContext);
