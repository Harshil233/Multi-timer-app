import React from "react";
import { useTimers } from "../contexts/TimerContext";
import History from "./History";

export default function HistoryPage() {
  const { history, clearHistory } = useTimers();

  return (
    <>
      <History history={history} />
      {history.length > 0 && (
        <div className="clear-history-container">
          <button onClick={clearHistory} className="clear-history-button">
            Clear History
          </button>
        </div>
      )}
    </>
  );
}
