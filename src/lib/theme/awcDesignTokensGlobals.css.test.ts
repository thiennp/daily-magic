import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  AWC_RADIUS_TOKENS,
  AWC_SEMANTIC_COLOR_TOKEN_NAMES,
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
