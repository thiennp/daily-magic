import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  AWC_V5_BLUE_HEX,
  AWC_V5_CHIP_HEIGHT_TOKENS,
  AWC_V5_DISABLED_TOKENS,
  AWC_V5_LAYOUT_TOKENS,
  AWC_V5_NEUTRAL_HEX,
  AWC_V5_RADIUS_TOKENS,
  AWC_V5_SHADOW_TOKENS,
  AWC_V5_SPACING_TOKENS,
  AWC_V5_STATUS_HEX,
  AWC_V5_TYPE_SIZE_TOKENS,
} from "@/lib/theme/awcDesignTokens.constant";

const globalsCss = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

const px = (n: number): string => `${n}px`;

/** chip → chip-h, chip-sm → chip-h-sm. */
const chipHeightCssKey = (key: string): string => {
  if (key === "chip") {
    return "chip-h";
  }
  if (key === "chip-sm") {
    return "chip-h-sm";
  }
  return key;
};

const collectV5CssMirrorExpectations = (): Array<{
  cssName: string;
  cssValue: string;
}> => {
  const expected: Array<{ cssName: string; cssValue: string }> = [];
  for (const [key, value] of Object.entries(AWC_V5_BLUE_HEX)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_NEUTRAL_HEX)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_STATUS_HEX)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_TYPE_SIZE_TOKENS)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_SPACING_TOKENS)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: px(value) });
  }
  for (const [key, value] of Object.entries(AWC_V5_RADIUS_TOKENS)) {
    expected.push({ cssName: `--awc-radius-${key}`, cssValue: px(value) });
  }
  for (const [key, value] of Object.entries(AWC_V5_SHADOW_TOKENS)) {
    expected.push({ cssName: `--awc-shadow-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_LAYOUT_TOKENS)) {
    expected.push({ cssName: `--awc-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_DISABLED_TOKENS)) {
    expected.push({ cssName: `--awc-disabled-${key}`, cssValue: value });
  }
  for (const [key, value] of Object.entries(AWC_V5_CHIP_HEIGHT_TOKENS)) {
    expected.push({
      cssName: `--awc-${chipHeightCssKey(key)}`,
      cssValue: px(value),
    });
  }
  return expected;
};

describe("globals.css L3 v5 foundation parity (TS source)", () => {
  it("mirrors every AWC_V5_* CSS-facing entry as --awc-*", () => {
    const expected = collectV5CssMirrorExpectations();
    expect(expected.length).toBeGreaterThan(50);
    for (const { cssName, cssValue } of expected) {
      expect(
        globalsCss,
        `missing or drifted: ${cssName}: ${cssValue}`,
      ).toContain(`${cssName}: ${cssValue}`);
    }
  });

  it("exposes v5 radii including chip-sm without overwriting brand-*", () => {
    for (const key of Object.keys(AWC_V5_RADIUS_TOKENS)) {
      expect(globalsCss).toContain(
        `--radius-awc-${key}: var(--awc-radius-${key})`,
      );
    }
    expect(globalsCss).toContain("--color-brand-500: #1f6656");
    expect(globalsCss).toContain("--color-brand-600: #1f6656");
    expect(globalsCss).toContain("--color-brand-700: #19564a");
    expect(globalsCss).toContain("--radius-card: 14px");
    expect(globalsCss).toContain("--awc-radius-card: 20px");
  });

  it("ships opt-in .awc-disabled without global button:disabled restyle", () => {
    expect(globalsCss).toContain(".awc-disabled");
    expect(globalsCss).toContain("var(--awc-disabled-bg)");
    expect(globalsCss).not.toMatch(
      /button:disabled\s*,\s*\[aria-disabled="true"\]\s*\{[^}]*awc-disabled/,
    );
  });
});
