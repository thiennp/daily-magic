import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("GuestAwarePageStack (AW-EMPTY-1)", () => {
  it("tightens stack spacing for guest session on Library and Reports layouts", () => {
    const stack = readFileSync(
      join(process.cwd(), "src/features/empty-states/GuestAwarePageStack.tsx"),
      "utf8",
    );
    const libraryHeader = readFileSync(
      join(process.cwd(), "src/features/library/LibraryPageHeader.tsx"),
      "utf8",
    );
    const reportsHeader = readFileSync(
      join(process.cwd(), "src/features/reports/ReportsPageHeader.tsx"),
      "utf8",
    );

    expect(stack).toContain('sessionState === "guest"');
    expect(stack).toContain("space-y-4");
    expect(libraryHeader).toContain('sessionState === "signed_in"');
    expect(libraryHeader).toContain("description =");
    expect(reportsHeader).toContain('sessionState === "signed_in"');
  });
});
