/**
 * Hex tokens aligned with AWC `@theme` brand + gray scales (Tailwind 4).
 * AWL inline CSS and docs reference these values — keep in sync with
 * `src/app/globals.css` when brand ramps change.
 */
export const AGENT_WITCH_PUBLIC_UI_TOKENS = {
  brand50: "#eaf0fe",
  brand100: "#d6e1fc",
  brand600: "#1a44be",
  brand700: "#15359c",
  gray50: "#f9fafb",
  gray100: "#f2f4f7",
  gray200: "#e4e7ec",
  gray400: "#98a2b3",
  gray500: "#667085",
  gray600: "#475467",
  gray700: "#344054",
  gray900: "#101828",
  gray950: "#0c111d",
  white: "#ffffff",
  success50: "#ecfdf3",
  success700: "#027a48",
  warning50: "#fffbeb",
  warning900: "#78350f",
  error50: "#fef3f2",
  error700: "#b42318",
} as const;

export type AgentWitchPublicUiTokens = typeof AGENT_WITCH_PUBLIC_UI_TOKENS;
