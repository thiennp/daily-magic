import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_V5_FONT_CSS_VARS } from "@/lib/theme/awcDesignTokens.constant";

const awcFontsSource = fs.readFileSync(
  path.join(process.cwd(), "src/lib/theme/awcFonts.ts"),
  "utf8",
);

describe("awcFonts", () => {
  it("pins localFont variable literals to AWC_V5_FONT_CSS_VARS", () => {
    // next/font requires a string literal for `variable`; keep the source
    // literal identical to the shared constant.
    expect(awcFontsSource).toContain(
      `variable: "${AWC_V5_FONT_CSS_VARS.sans}"`,
    );
    expect(awcFontsSource).toContain(
      `variable: "${AWC_V5_FONT_CSS_VARS.mono}"`,
    );
  });
});
