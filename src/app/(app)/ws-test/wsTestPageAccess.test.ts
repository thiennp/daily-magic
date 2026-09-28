import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/** Rity P0 — /ws-test must not be a public redirect surface. */
describe("ws-test page access (Rity P0)", () => {
  it("requires staff access before redirecting", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/(app)/ws-test/page.tsx"),
      "utf8",
    );

    expect(source.includes("requireStaffPageAccess")).toBe(true);
  });
});
