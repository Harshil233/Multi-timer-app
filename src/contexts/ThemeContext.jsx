import React, { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useLocalStorage("timer_theme", null);

  useEffect(() => {
    if (darkTheme === null) {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkTheme(prefers);
    }
  }, [darkTheme, setDarkTheme]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => setDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
