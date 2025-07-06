// Updated ThemeProvider using the custom hook
import React, { useEffect, useState } from "react";
import { ThemeContext } from "../context/theme-context";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("darkMode");
    if (saved) return JSON.parse(saved);

    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state from localStorage or system preference
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Save to localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
