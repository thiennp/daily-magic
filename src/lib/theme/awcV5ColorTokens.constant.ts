/**
 * L3 v5 foundation colour tokens (light only). TS is source of truth;
 * globals.css mirrors every entry as --awc-*. Additive — does not overwrite brand-*.
 */

export const AWC_V5_BLUE_HEX = {
  "blue-25": "#f7f9fe",
  "blue-50": "#eff4ff",
  "blue-100": "#dbe6fe",
  "blue-200": "#bdd1fd",
  "blue-300": "#8fb0fa",
  "blue-400": "#5b86f3",
  "blue-500": "#3563e9",
  "blue-600": "#2150d6",
  "blue-700": "#1b3fae",
  "blue-800": "#1a3589",
  "blue-900": "#172e6b",
  "blue-950": "#0f1c42",
} as const;

/** One warm-grey family for canvas, tiles, fills, borders + ink. */
export const AWC_V5_NEUTRAL_HEX = {
  bg: "#e8e6e1",
  surface: "#ffffff",
  "surface-2": "#f7f6f4",
  tile: "#f4f3f0",
  "tile-2": "#ebe9e4",
  fill: "#e9e7e2",
  "accent-soft": "#e4ecff",
  "accent-soft-2": "#d6e2ff",
  border: "#ddd9d2",
  "border-strong": "#c9c4bb",
  "control-border": "#8a8478",
  fg: "#101828",
  "fg-muted": "#4b5567",
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
