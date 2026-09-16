import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/** UX-P0a — onboarding showcase SVGs must not expose placeholder copy. */
describe("onboarding showcase SVG copy (UX-P0a)", () => {
  it("does not include dummy-data placeholder subtitles", () => {
    const onboardingDir = join(process.cwd(), "public/showcases/onboarding");
    const svgFiles = readdirSync(onboardingDir).filter((name) =>
      name.endsWith(".svg"),
    );

    const offenders: string[] = [];

    for (const fileName of svgFiles) {
      const contents = readFileSync(join(onboardingDir, fileName), "utf8");
      if (/\bdummy\b/i.test(contents)) {
        offenders.push(fileName);
      }
    }

    expect(offenders).toEqual([]);
  });
});
