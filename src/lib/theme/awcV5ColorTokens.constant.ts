/**
 * L3 v5 foundation colour tokens (light only). TS is source of truth;
 * globals.css mirrors every entry as --awc-*. Additive — does not overwrite brand-* (brand-* also Pine via globals).
 */

export const AWC_V5_BLUE_HEX = {
  "blue-25": "#f3f7f5",
  "blue-50": "#eaf2ef",
  "blue-100": "#dde8e3",
  "blue-200": "#c8ddd6",
  "blue-300": "#9fc4b8",
  "blue-400": "#5a9a88",
  "blue-500": "#2a7a68",
  "blue-600": "#1f6656",
  "blue-700": "#19564a",
  "blue-800": "#13463c",
  "blue-900": "#0e352e",
  "blue-950": "#0a241f",
} as const;

/** Sand surfaces + cool slate borders/ink (artifact palette). */
export const AWC_V5_NEUTRAL_HEX = {
  bg: "#e8e6e1",
  surface: "#ffffff",
  "surface-2": "#f7f6f4",
  tile: "#f4f3f0",
  "tile-2": "#ebe9e4",
  fill: "#e9e7e2",
  "accent-soft": "#dde8e3",
  "accent-soft-2": "#c8ddd6",
  border: "#e0e5ed",
  "border-strong": "#cbd2de",
  "control-border": "#748094",
  fg: "#101828",
  "fg-muted": "#475467",
  "fg-subtle": "#566073",
} as const;

export const AWC_V5_STATUS_HEX = {
  "ok-soft": "#dff3e8",
  ok: "#0b6b3d",
  "ok-dot": "#12804a",
  "warn-soft": "#fdecc4",
  warn: "#7a4500",
  "warn-dot": "#b86a00",
  "bad-soft": "#fbdedb",
  bad: "#b42318",
  "bad-dot": "#d92d20",
  "info-soft": "#e1eaff",
  "attention-bg": "#fbeccb",
  "bubble-own": "#e8ecf3",
  "terminal-bg": "#0f172a",
  "terminal-fg": "#e6eaf2",
  "terminal-muted": "#a3adc0",
} as const;

/** Disabled look (#29). Opt-in via .awc-disabled — not global in V5-1. */
export const AWC_V5_DISABLED_TOKENS = {
  bg: AWC_V5_NEUTRAL_HEX["tile-2"],
  fg: AWC_V5_NEUTRAL_HEX["fg-subtle"],
  border: AWC_V5_NEUTRAL_HEX["border-strong"],
} as const;
