import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/** Testi A2 — E2E showcase slugs must 404 anonymously (not 500 from static+dynamic auth). */
describe("showcase E2E staff gate (Testi A2)", () => {
  it("opts into dynamic rendering before auth on staff-gated showcase routes", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/(app)/showcases/[slug]/page.tsx"),
      "utf8",
    );
    const staffAccessSource = readFileSync(
      join(process.cwd(), "src/lib/auth/requireStaffPageAccess.ts"),
      "utf8",
    );

    expect(pageSource.includes("isStaffPageViewer()")).toBe(true);
    expect(pageSource.includes('dynamic = "force-dynamic"')).toBe(true);
    expect(staffAccessSource.includes("connection()")).toBe(true);
  });
});
