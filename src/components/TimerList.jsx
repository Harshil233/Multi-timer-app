import React, { useState } from "react";
import TimerItem from "./TimerItem";

const TimerList = ({
  timers,
  startTimer,
  pauseTimer,
  resetTimer,
  deleteTimer,
  bulkAction,
}) => {
  // Group timers by category
  const grouped = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("All");

  const toggleCategory = (category) => {
    setExpanded((e) => ({ ...e, [category]: !e[category] }));
  };

  const filteredCategories =
    filter === "All" ? categories : categories.filter((c) => c === filter);

  return (
    <div
      className="timer-list"
      style={{ display: `${categories.length > 0 ? "" : "none"}` }}
    >
      <div className="filter-dropdown">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredCategories.map((category) => (
        <div key={category} className="category-section">
          <div
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            <h3>{category}</h3>
            <span>{expanded[category] ? "−" : "+"}</span>
          </div>

          <div className="category-bulk-actions">
            <button onClick={() => bulkAction(category, "start")}>
              Start All
            </button>
            <button onClick={() => bulkAction(category, "pause")}>
              Pause All
            </button>
            <button onClick={() => bulkAction(category, "reset")}>
              Reset All
            </button>
          </div>

          {expanded[category] && (
            <div className="timers">
              {grouped[category].map((timer) => (
                <TimerItem
                  key={timer.id}
                  timer={timer}
                  startTimer={startTimer}
                  pauseTimer={pauseTimer}
                  resetTimer={resetTimer}
                  deleteTimer={deleteTimer}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimerList;
