import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function AppLayout({ children }) {
  const { darkTheme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className="app-container">
      <header>
        <h1>Multi‑Timer By Harshil</h1>
        <nav>
          <Link to="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            to="/history"
            className={pathname === "/history" ? "active" : ""}
          >
            History
          </Link>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {darkTheme ? "☀️" : "🌙"}
          </button>
        </nav>
      </header>
      {children}
    </div>
  );
}
