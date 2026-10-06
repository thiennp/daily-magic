/**
 * Semantic design-token aliases for AWC layout slices.
 * Values reference the existing Tailwind @theme palette (no new hex).
 * CSS mirrors these in src/app/globals.css under :root / .dark.
 *
 * L3 v5 foundation tokens (AWC_V5_*) are additive: new --awc-* CSS names
 * for later project-page slices. They do not overwrite brand-* or live
 * semantic aliases, so existing component styles stay unchanged.
 */

export type AwcThemeMode = "light" | "dark";

export type AwcSemanticColorTokenName =
  | "bg"
  | "surface"
  | "surface-2"
  | "line"
  | "fg"
  | "muted"
  | "ok"
  | "ok-soft"
  | "warn"
  | "warn-soft"
  | "bad"
  | "bad-soft";

/** Existing @theme color keys each semantic token aliases (light). */
export const AWC_SEMANTIC_COLOR_ALIASES_LIGHT = {
  bg: "gray-50",
  surface: "white",
  "surface-2": "gray-100",
  line: "gray-200",
  fg: "gray-900",
  muted: "gray-500",
  ok: "success-600",
  "ok-soft": "success-50",
  warn: "warning-600",
  "warn-soft": "warning-50",
  bad: "error-600",
  "bad-soft": "error-50",
} as const satisfies Record<AwcSemanticColorTokenName, string>;

/** Existing @theme color keys each semantic token aliases (dark). */
export const AWC_SEMANTIC_COLOR_ALIASES_DARK = {
  bg: "gray-950",
  surface: "gray-900",
  "surface-2": "gray-800",
  line: "gray-800",
  fg: "gray-100",
  muted: "gray-400",
  ok: "success-400",
  "ok-soft": "success-950",
  warn: "warning-400",
  "warn-soft": "warning-950",
  bad: "error-400",
  "bad-soft": "error-950",
} as const satisfies Record<AwcSemanticColorTokenName, string>;

export const AWC_SEMANTIC_COLOR_ALIASES_BY_MODE = {
  light: AWC_SEMANTIC_COLOR_ALIASES_LIGHT,
  dark: AWC_SEMANTIC_COLOR_ALIASES_DARK,
} as const;

export const AWC_SEMANTIC_COLOR_TOKEN_NAMES = Object.keys(
  AWC_SEMANTIC_COLOR_ALIASES_LIGHT,
) as AwcSemanticColorTokenName[];

/** Named radii for layout slices (px). Live values — do not change in V5-1. */
export const AWC_RADIUS_TOKENS = {
  card: 14,
  control: 10,
  "control-sm": 8,
  pill: 999,
  banner: 12,
} as const;

/** L3 v5 project-page foundation — light only. CSS vars use --awc-* names. */
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

/** One warm-grey family for canvas, tiles, fills, and borders + ink. */
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

/** V5 radii (px). Live AWC_RADIUS_TOKENS stay at pre-v5 values until slices adopt. */
export const AWC_V5_RADIUS_TOKENS = {
  card: 20,
  control: 12,
  chip: 8,
  "chip-sm": 7,
  pill: 999,
  lg: 18,
  xl: 28,
  dock: 20,
} as const;

export const AWC_V5_TYPE_TOKENS = {
  "fs-chip": "12px",
  "fs-row-sub": "12.5px",
  "fs-sm": "13px",
  "fs-body": "14px",
  "fs-card-title": "15.5px",
  "fs-md": "16px",
  "fs-h1": "32px",
  "fw-chip": 600,
  "fw-body": 400,
  "fw-card-title": 600,
  "fw-h1": 600,
  "tracking-h1": "-0.02em",
} as const;

export const AWC_V5_SPACING_TOKENS = {
  "sp-1": 4,
  "sp-2": 8,
  "sp-3": 12,
  "sp-4": 16,
  "sp-5": 20,
  "sp-6": 24,
  "sp-8": 32,
  "sp-10": 40,
  "sp-12": 48,
} as const;

export const AWC_V5_SHADOW_TOKENS = {
  lift: "0 1px 2px rgba(16,24,40,.05), 0 1px 1px rgba(16,24,40,.03)",
  card: "0 0 0 1px rgba(16,24,40,.05), 0 1px 2px rgba(16,24,40,.05)",
  dock: "0 18px 48px rgba(16,24,40,.18)",
  overlay: "0 16px 48px rgba(16,24,40,.18)",
  "focus-ring":
    "0 0 0 2px var(--awc-surface), 0 0 0 4px var(--awc-blue-600)",
} as const;

export const AWC_V5_LAYOUT_TOKENS = {
  "side-w": "240px",
  "top-h": "60px",
} as const;

/** Disabled control look (#29). Opt-in via .awc-disabled — not applied globally in V5-1. */
export const AWC_V5_DISABLED_TOKENS = {
  bg: AWC_V5_NEUTRAL_HEX["tile-2"],
  fg: AWC_V5_NEUTRAL_HEX["fg-subtle"],
  border: AWC_V5_NEUTRAL_HEX["border-strong"],
} as const;

export const AWC_V5_FONT_CSS_VARS = {
  sans: "--font-awc-sans",
  mono: "--font-awc-mono",
} as const;

export const AWC_V5_CHIP_HEIGHT_TOKENS = {
  chip: 24,
  "chip-sm": 22,
} as const;
