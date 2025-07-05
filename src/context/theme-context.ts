import { createContext, useContext } from "react";

export const ThemeContext = createContext<{
  darkMode: boolean;
  toggleTheme: () => void;
}>({
  darkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
