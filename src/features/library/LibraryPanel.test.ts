import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("LibraryPanel load failure UX", () => {
  it("surfaces retry when capabilities fetch fails", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/library/LibraryPanel.tsx"),
      "utf8",
    );

    expect(source).toContain("Could not load your library");
    expect(source).toContain("loadFailed");
    expect(source).toContain("Try again");
  });
});
