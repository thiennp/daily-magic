type ThemeToggleTheme = "light" | "dark";

/** Accessible name for the theme toggle: names the action the click will take. */
const themeToggleLabel = (theme: ThemeToggleTheme): string =>
  theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

export default themeToggleLabel;
