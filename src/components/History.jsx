import React from "react";

const History = ({ history }) => {
  const sortedHistory = [...history].sort((a, b) => {
    return new Date(b.completedAt) - new Date(a.completedAt);
  });

  const groupByDate = () => {
    const groups = {};
    sortedHistory.forEach((item) => {
      const date = item.completedAt.split(",")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    return groups;
  };

  const historyByDate = groupByDate();

  const exportAsJSON = () => {
    const json = JSON.stringify(history, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "timer-history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history">
      <div className="history-header">
        <h2>Timer History</h2>
        {history.length > 0 && (
          <button onClick={exportAsJSON} className="export-button">
            Export as JSON
          </button>
        )}
      </div>

      {Object.keys(historyByDate).length === 0 ? (
        <div className="history-empty">
          <p>No completed timers yet.</p>
          <p className="history-empty-subtext">
            Completed timers will appear here.
          </p>
        </div>
      ) : (
        Object.entries(historyByDate).map(([date, entries]) => (
          <div key={date} className="history-date-group">
            <div className="history-date-header">{date}</div>

            <div className="history-cards">
              {entries.map((entry, index) => (
                <div key={index} className="history-card">
                  <div className="history-card-header">
                    <h3 className="history-card-title">{entry.name}</h3>
                    {entry.category && (
                      <span className="history-card-category">
                        {entry.category}
                      </span>
                    )}
                  </div>

                  <div className="history-card-info">
                    {entry.duration && (
                      <div className="history-card-duration">
                        <span className="history-card-label">Duration:</span>
                        <span className="history-card-value">
                          {formatDuration(entry.duration)}
                        </span>
                      </div>
                    )}

                    <div className="history-card-time">
                      <span className="history-card-label">Completed:</span>
                      <span className="history-card-value">
                        {entry.completedAt.split(",")[1]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
};

export default History;
