import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useMarketplaceState guest gating", () => {
  it("skips marketplace fetch when signed out", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/marketplace/hooks/useMarketplaceState.ts"),
      "utf8",
    );

    expect(source).toContain("useSession");
    expect(source).toContain('status !== "authenticated"');
    expect(source).toContain('fetch("/api/harness/marketplace")');
  });
});
