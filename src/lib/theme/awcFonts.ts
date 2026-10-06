import localFont from "next/font/local";

/**
 * L3 v5 foundation fonts — CSS variables only.
 * Not applied as the document font-family yet; later slices opt in.
 * Self-hosted under public/fonts (SIL OFL 1.1 — see public/fonts/OFL.txt).
 *
 * next/font requires `variable` as a string literal in the localFont call,
 * so the literals here are pinned to AWC_V5_FONT_CSS_VARS by awcFonts.test.ts.
 */
export const awcPlexSans = localFont({
  src: [
    {
      path: "../../../public/fonts/IBMPlexSans-Variable.woff2",
      weight: "100 700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSans-Italic-Variable.woff2",
      weight: "100 700",
      style: "italic",
    },
  ],
  variable: "--font-awc-sans",
  display: "swap",
  preload: false,
});

export const awcPlexMono = localFont({
  src: [
    {
      path: "../../../public/fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-awc-mono",
  display: "swap",
  preload: false,
});
