import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/** COPY-LEGAL-1 */
describe("marketing legal pages", () => {
  it("defines privacy and terms app routes", () => {
    expect(existsSync(join(process.cwd(), "src/app/privacy/page.tsx"))).toBe(
      true,
    );
    expect(existsSync(join(process.cwd(), "src/app/terms/page.tsx"))).toBe(
      true,
    );
  });
});
