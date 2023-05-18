import React, { createContext, useState, useEffect } from "react";
import { getTheme, setTheme } from '../utils/themeStorage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const storedTheme = await getTheme();
    setDarkModeEnabled(storedTheme);
  };

  const toggleDarkMode = async () => {
    const updatedTheme = !darkModeEnabled;
    setDarkModeEnabled(updatedTheme);
    setTheme(updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkModeEnabled, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
