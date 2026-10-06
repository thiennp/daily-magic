import { describe, expect, it } from "vitest";

import {
  AWC_RADIUS_TOKENS,
  AWC_SEMANTIC_COLOR_ALIASES_BY_MODE,
  AWC_SEMANTIC_COLOR_ALIASES_DARK,
  AWC_SEMANTIC_COLOR_ALIASES_LIGHT,
  AWC_SEMANTIC_COLOR_TOKEN_NAMES,
  AWC_V5_BLUE_HEX,
  AWC_V5_DISABLED_TOKENS,
  AWC_V5_FONT_CSS_VARS,
  AWC_V5_LAYOUT_TOKENS,
  AWC_V5_NEUTRAL_HEX,
  AWC_V5_RADIUS_TOKENS,
  AWC_V5_SHADOW_TOKENS,
  AWC_V5_SPACING_TOKENS,
  AWC_V5_STATUS_HEX,
  AWC_V5_TYPE_TOKENS,
  type AwcSemanticColorTokenName,
} from "@/lib/theme/awcDesignTokens.constant";

describe("awcDesignTokens", () => {
  it("defines the same semantic color tokens in light and dark", () => {
    const lightKeys = Object.keys(AWC_SEMANTIC_COLOR_ALIASES_LIGHT).sort();
    const darkKeys = Object.keys(AWC_SEMANTIC_COLOR_ALIASES_DARK).sort();

    expect(lightKeys).toEqual(darkKeys);
    expect(lightKeys).toEqual([...AWC_SEMANTIC_COLOR_TOKEN_NAMES].sort());
  });

  it("aliases every token to an existing palette key in both modes", () => {
    for (const mode of ["light", "dark"] as const) {
      const aliases = AWC_SEMANTIC_COLOR_ALIASES_BY_MODE[mode];
      for (const name of AWC_SEMANTIC_COLOR_TOKEN_NAMES) {
        const alias = aliases[name as AwcSemanticColorTokenName];
        expect(alias.length).toBeGreaterThan(0);
        expect(alias).not.toMatch(/^#/);
      }
    }
  });

  it("exposes the layout radii from the redesign notes", () => {
    expect(AWC_RADIUS_TOKENS).toEqual({
      card: 14,
      control: 10,
      "control-sm": 8,
      pill: 999,
      banner: 12,
    });
  });
});

describe("awcDesignTokens L3 v5 foundation", () => {
  it("pins the effective brand blue primary and hover", () => {
    expect(AWC_V5_BLUE_HEX["blue-500"]).toBe("#3563e9");
    expect(AWC_V5_BLUE_HEX["blue-600"]).toBe("#2150d6");
    expect(AWC_V5_BLUE_HEX["blue-700"]).toBe("#1b3fae");
    expect(AWC_V5_BLUE_HEX["blue-950"]).toBe("#0f1c42");
  });

  it("pins the warm-grey canvas and one border family", () => {
    expect(AWC_V5_NEUTRAL_HEX.bg).toBe("#e8e6e1");
    expect(AWC_V5_NEUTRAL_HEX.surface).toBe("#ffffff");
    expect(AWC_V5_NEUTRAL_HEX.tile).toBe("#f4f3f0");
    expect(AWC_V5_NEUTRAL_HEX["tile-2"]).toBe("#ebe9e4");
    expect(AWC_V5_NEUTRAL_HEX.border).toBe("#ddd9d2");
    expect(AWC_V5_NEUTRAL_HEX["border-strong"]).toBe("#c9c4bb");
    expect(AWC_V5_NEUTRAL_HEX["control-border"]).toBe("#8a8478");
    expect(AWC_V5_NEUTRAL_HEX.fg).toBe("#101828");
    expect(AWC_V5_NEUTRAL_HEX["fg-muted"]).toBe("#4b5567");
    expect(AWC_V5_NEUTRAL_HEX["fg-subtle"]).toBe("#566073");
  });

  it("pins status chip tints and disabled / focus / radius foundation", () => {
    expect(AWC_V5_STATUS_HEX["ok-soft"]).toBe("#dff3e8");
    expect(AWC_V5_STATUS_HEX["warn-soft"]).toBe("#fdecc4");
    expect(AWC_V5_STATUS_HEX["bad-soft"]).toBe("#fbdedb");
    expect(AWC_V5_STATUS_HEX["info-soft"]).toBe("#e1eaff");
    expect(AWC_V5_DISABLED_TOKENS).toEqual({
      bg: "#ebe9e4",
      fg: "#566073",
      border: "#c9c4bb",
    });
    expect(AWC_V5_RADIUS_TOKENS.card).toBe(20);
    expect(AWC_V5_RADIUS_TOKENS.control).toBe(12);
    expect(AWC_V5_RADIUS_TOKENS.chip).toBe(8);
    expect(AWC_V5_SHADOW_TOKENS["focus-ring"]).toContain("var(--awc-blue-600)");
    expect(AWC_V5_LAYOUT_TOKENS["side-w"]).toBe("240px");
    expect(AWC_V5_LAYOUT_TOKENS["top-h"]).toBe("60px");
    expect(AWC_V5_TYPE_TOKENS["fs-h1"]).toBe("32px");
    expect(AWC_V5_SPACING_TOKENS["sp-1"]).toBe(4);
    expect(AWC_V5_SPACING_TOKENS["sp-12"]).toBe(48);
    expect(AWC_V5_FONT_CSS_VARS).toEqual({
      sans: "--font-awc-sans",
      mono: "--font-awc-mono",
    });
  });

  it("keeps live radius tokens unchanged while v5 radii are additive", () => {
    expect(AWC_RADIUS_TOKENS.card).toBe(14);
    expect(AWC_V5_RADIUS_TOKENS.card).toBe(20);
    expect(AWC_RADIUS_TOKENS.control).toBe(10);
    expect(AWC_V5_RADIUS_TOKENS.control).toBe(12);
  });
});
