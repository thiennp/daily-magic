/**
 * L3 v5 foundation metric tokens (radii, type, space, shadow, layout, chip).
 * TS is source of truth; globals.css mirrors CSS-facing entries as --awc-*.
 */

/** V5 radii (px). Live AWC_RADIUS_TOKENS stay pre-v5 until slices adopt. */
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

/** Font sizes mirrored to --awc-fs-* in globals.css. */
export const AWC_V5_TYPE_SIZE_TOKENS = {
  "fs-chip": "12px",
  "fs-row-sub": "12.5px",
  "fs-sm": "13px",
  "fs-body": "14px",
  "fs-card-title": "15.5px",
  "fs-md": "16px",
  "fs-h1": "32px",
} as const;

/** Weight / tracking — TS-only (not mirrored to CSS in V5-1). */
export const AWC_V5_TYPE_FACE_TOKENS = {
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

/** Shadow strings — must match globals.css --awc-shadow-* exactly. */
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

export const AWC_V5_FONT_CSS_VARS = {
  sans: "--font-awc-sans",
  mono: "--font-awc-mono",
} as const;

/** Chip heights (px). CSS: chip → --awc-chip-h, chip-sm → --awc-chip-h-sm. */
export const AWC_V5_CHIP_HEIGHT_TOKENS = {
  chip: 24,
  "chip-sm": 22,
} as const;
