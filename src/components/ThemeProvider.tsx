import React, { useState, useEffect } from "react";
import { ThemeContext } from "../context/theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "boolean") {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Failed to parse darkMode from localStorage:", error);
    }

    // Check system preference
    try {
      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    } catch (error) {
      console.warn("Failed to check system color scheme:", error);
    }
  }
  return false;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
