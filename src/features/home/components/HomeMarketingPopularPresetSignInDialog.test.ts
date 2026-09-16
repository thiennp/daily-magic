import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("HomeMarketingPopularPresetSignInDialog (AW-ONBOARD-1)", () => {
  it("Create free account uses the same callbackUrl as Sign in", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/home/components/HomeMarketingPopularPresetSignInDialog.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("href={loginHref}");
    expect(source).not.toContain('href="/#get-started"');
  });
});
