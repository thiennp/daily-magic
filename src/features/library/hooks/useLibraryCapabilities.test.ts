import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useLibraryCapabilities", () => {
  it("marks loadFailed when capabilities array is missing from a 200 body", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/library/hooks/useLibraryCapabilities.ts",
      ),
      "utf8",
    );

    expect(source).toContain("setLoadFailed(true)");
    expect(source).toMatch(/} else {\s*setLoadFailed\(true\);/);
  });
});
