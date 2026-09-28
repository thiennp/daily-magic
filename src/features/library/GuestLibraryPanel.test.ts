import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("GuestLibraryPanel (AW-EMPTY-1)", () => {
  it("footer signup link uses Create free account without article", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/library/GuestLibraryPanel.tsx"),
      "utf8",
    );

    expect(source).toContain("Create free account");
    expect(source).not.toContain("Create a free account");
    expect(source).toContain("CREATE_FREE_ACCOUNT_HREF");
  });
});
