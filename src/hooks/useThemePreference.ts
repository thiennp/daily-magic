"use client";

import { useTheme } from "@/context/ThemeContext";

type ThemePreference = "light" | "dark";

/**
 * Preference API for design-token layout slices.
 * Built on the existing ThemeContext (.dark class + localStorage "theme").
 */
const useThemePreference = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return {
    preference: theme as ThemePreference,
    resolved: theme as ThemePreference,
    setThemePreference: setTheme,
    toggleTheme,
  };
};

export default useThemePreference;
