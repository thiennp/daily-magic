/**
 * Semantic design-token aliases for AWC layout slices.
 * Live semantic aliases reference the existing Tailwind @theme palette.
 * CSS mirrors them in src/app/globals.css under :root / .dark.
 *
 * L3 v5 foundation tokens live in awcV5ColorTokens / awcV5MetricTokens
 * (re-exported here). TS is the source of truth for --awc-* values.
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

export {
  AWC_V5_BLUE_HEX,
  AWC_V5_DISABLED_TOKENS,
  AWC_V5_NEUTRAL_HEX,
  AWC_V5_STATUS_HEX,
} from "@/lib/theme/awcV5ColorTokens.constant";

export {
  AWC_V5_CHIP_HEIGHT_TOKENS,
  AWC_V5_FONT_CSS_VARS,
  AWC_V5_LAYOUT_TOKENS,
  AWC_V5_RADIUS_TOKENS,
  AWC_V5_SHADOW_TOKENS,
  AWC_V5_SPACING_TOKENS,
  AWC_V5_TYPE_FACE_TOKENS,
  AWC_V5_TYPE_SIZE_TOKENS,
} from "@/lib/theme/awcV5MetricTokens.constant";
