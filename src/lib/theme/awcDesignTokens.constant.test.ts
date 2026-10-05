import { describe, expect, it } from "vitest";

import {
  AWC_RADIUS_TOKENS,
  AWC_SEMANTIC_COLOR_ALIASES_BY_MODE,
  AWC_SEMANTIC_COLOR_ALIASES_DARK,
  AWC_SEMANTIC_COLOR_ALIASES_LIGHT,
  AWC_SEMANTIC_COLOR_TOKEN_NAMES,
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
