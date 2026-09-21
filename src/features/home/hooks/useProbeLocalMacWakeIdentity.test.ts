import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useProbeLocalMacWakeIdentity (HOME-050)", () => {
  it("retries wake identity when the tab is focused or visible again", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/home/hooks/useProbeLocalMacWakeIdentity.ts",
      ),
      "utf8",
    );

    expect(source).toContain("retryUnreachableLocalAgentWitchIdentity");
    expect(source).toContain("resolveShouldProbeWakeIdentityInBrowser");
    expect(source).toContain('sessionStatus !== "authenticated"');
    expect(source).toContain("visibilitychange");
    expect(source).toContain("focus");
  });
});
