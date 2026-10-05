/**
 * Semantic design-token aliases for AWC layout slices.
 * Values reference the existing Tailwind @theme palette (no new hex).
 * CSS mirrors these in src/app/globals.css under :root / .dark.
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

/** Named radii for layout slices (px). */
export const AWC_RADIUS_TOKENS = {
  card: 14,
  control: 10,
  "control-sm": 8,
  pill: 999,
  banner: 12,
} as const;
