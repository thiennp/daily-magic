import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useAutomationsPageData", () => {
  it("marks loadFailed when automations response is not ok", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/automations/hooks/useAutomationsPageData.ts",
      ),
      "utf8",
    );

    expect(source).toContain("setLoadFailed(true)");
    expect(source).toMatch(/!automationsResponse\.ok/);
    expect(source).toMatch(/!capabilitiesResponse\.ok/);
    expect(source).toContain("loadGenerationRef");
  });
});
