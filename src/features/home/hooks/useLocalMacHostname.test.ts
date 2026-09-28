import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useLocalMacHostname (HOME-061)", () => {
  it("passes reachable-device match into shouldProbe for checking state", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/home/hooks/useLocalMacHostname.ts"),
      "utf8",
    );

    expect(source).toContain("resolveLocalTokenHashMatchesReachableDevice");
    expect(source).toMatch(
      /shouldProbeWakeIdentity:\s*resolveShouldProbeWakeIdentityInBrowser\(\{[\s\S]*localTokenHashMatchesReachableDevice/,
    );
  });
});
