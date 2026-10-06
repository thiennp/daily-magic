import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import "flatpickr/dist/flatpickr.css";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AWC_THEME_INIT_INLINE_SCRIPT } from "@/lib/theme/themeInitInlineScript.constant";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

/**
 * L3 v5 foundation fonts — CSS variables only (--font-awc-sans / --font-awc-mono).
 * Not applied as the document font-family yet; later slices opt in.
 * Self-hosted under public/fonts (SIL OFL 1.1 — see public/fonts/OFL.txt).
 */
const awcPlexSans = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSans-Variable.woff2",
      weight: "100 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSans-Italic-Variable.woff2",
      weight: "100 700",
      style: "italic",
    },
  ],
  variable: "--font-awc-sans",
  display: "swap",
  preload: false,
});

const awcPlexMono = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-awc-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: AGENT_WITCH_PRODUCT_NAME,
  description:
    "Send AI tasks to your team's Macs with approval rules and job history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${awcPlexSans.variable} ${awcPlexMono.variable} dark:bg-gray-900`}
      >
        <Script
          id="awc-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: AWC_THEME_INIT_INLINE_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
