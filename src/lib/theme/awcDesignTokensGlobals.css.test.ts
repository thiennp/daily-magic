import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  AWC_RADIUS_TOKENS,
  AWC_SEMANTIC_COLOR_TOKEN_NAMES,
  AWC_V5_BLUE_HEX,
  AWC_V5_DISABLED_TOKENS,
  AWC_V5_LAYOUT_TOKENS,
  AWC_V5_NEUTRAL_HEX,
  AWC_V5_RADIUS_TOKENS,
  AWC_V5_STATUS_HEX,
} from "@/lib/theme/awcDesignTokens.constant";

const globalsCss = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

describe("globals.css semantic design tokens", () => {
  it("defines every semantic color token under :root and .dark", () => {
    for (const name of AWC_SEMANTIC_COLOR_TOKEN_NAMES) {
      const decl = `--${name}:`;
      expect(globalsCss).toContain(decl);
      expect(globalsCss.split(decl).length - 1).toBeGreaterThanOrEqual(2);
    }
  });

  it("exposes semantic colors and radii to Tailwind via @theme inline", () => {
    for (const name of AWC_SEMANTIC_COLOR_TOKEN_NAMES) {
      expect(globalsCss).toContain(`--color-${name}: var(--${name})`);
    }

    expect(globalsCss).toContain(`--radius-card: ${AWC_RADIUS_TOKENS.card}px`);
    expect(globalsCss).toContain(
      `--radius-control: ${AWC_RADIUS_TOKENS.control}px`,
    );
    expect(globalsCss).toContain(
      `--radius-control-sm: ${AWC_RADIUS_TOKENS["control-sm"]}px`,
    );
    expect(globalsCss).toContain(`--radius-pill: ${AWC_RADIUS_TOKENS.pill}px`);
    expect(globalsCss).toContain(
      `--radius-banner: ${AWC_RADIUS_TOKENS.banner}px`,
    );
  });

  it("does not introduce the artifact indigo accent palette", () => {
    expect(globalsCss).not.toContain("#3a43d4");
    expect(globalsCss).not.toContain("#8d95ff");
    expect(globalsCss).not.toContain("#e7e8fb");
    expect(globalsCss).not.toContain("#26274d");
  });
});

describe("globals.css L3 v5 foundation tokens", () => {
  it("defines additive --awc-* light foundation vars from effective hex", () => {
    expect(globalsCss).toContain(`--awc-blue-600: ${AWC_V5_BLUE_HEX["blue-600"]}`);
    expect(globalsCss).toContain(`--awc-blue-700: ${AWC_V5_BLUE_HEX["blue-700"]}`);
    expect(globalsCss).toContain(`--awc-bg: ${AWC_V5_NEUTRAL_HEX.bg}`);
    expect(globalsCss).toContain(`--awc-tile: ${AWC_V5_NEUTRAL_HEX.tile}`);
    expect(globalsCss).toContain(`--awc-border: ${AWC_V5_NEUTRAL_HEX.border}`);
    expect(globalsCss).toContain(
      `--awc-ok-soft: ${AWC_V5_STATUS_HEX["ok-soft"]}`,
    );
    expect(globalsCss).toContain("--awc-disabled-bg: var(--awc-tile-2)");
    expect(globalsCss).toContain("--awc-disabled-fg: var(--awc-fg-subtle)");
    expect(globalsCss).toContain(
      "--awc-disabled-border: var(--awc-border-strong)",
    );
    expect(AWC_V5_DISABLED_TOKENS.bg).toBe(AWC_V5_NEUTRAL_HEX["tile-2"]);
    expect(AWC_V5_DISABLED_TOKENS.fg).toBe(AWC_V5_NEUTRAL_HEX["fg-subtle"]);
    expect(AWC_V5_DISABLED_TOKENS.border).toBe(
      AWC_V5_NEUTRAL_HEX["border-strong"],
    );
    expect(globalsCss).toContain("--awc-shadow-focus-ring:");
    expect(globalsCss).toContain(
      `--awc-radius-card: ${AWC_V5_RADIUS_TOKENS.card}px`,
    );
    expect(globalsCss).toContain(
      `--awc-side-w: ${AWC_V5_LAYOUT_TOKENS["side-w"]}`,
    );
  });

  it("exposes awc foundation colors to Tailwind without overwriting brand-*", () => {
    expect(globalsCss).toContain("--color-awc-blue-600: var(--awc-blue-600)");
    expect(globalsCss).toContain("--color-awc-bg: var(--awc-bg)");
    expect(globalsCss).toContain("--color-awc-tile: var(--awc-tile)");
    // Live brand scale must remain (cooler/darker than v5 blues).
    expect(globalsCss).toContain("--color-brand-500: #1e4fd8");
    expect(globalsCss).toContain("--color-brand-600: #1a44be");
    // Live semantic radii stay at pre-v5 values.
    expect(globalsCss).toContain("--radius-card: 14px");
    expect(globalsCss).toContain("--awc-radius-card: 20px");
  });

  it("ships an opt-in .awc-disabled primitive without global button:disabled restyle", () => {
    expect(globalsCss).toContain(".awc-disabled");
    expect(globalsCss).toContain("var(--awc-disabled-bg)");
    // Must not blanket-restyle every disabled button in the live app.
    expect(globalsCss).not.toMatch(
      /button:disabled\s*,\s*\[aria-disabled="true"\]\s*\{[^}]*awc-disabled/,
    );
  });
});
