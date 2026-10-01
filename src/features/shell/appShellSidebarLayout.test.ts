import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("AppShell sidebar layout", () => {
  it("renders embedded primary nav in main when a custom sidebar is provided (admin)", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShell.tsx"),
      "utf8",
    );

    expect(source).toContain("const embeddedPrimaryNav = renderPrimaryNav");
    expect(source).toMatch(
      /sidebar \? \([\s\S]*\{embeddedPrimaryNav\}[\s\S]*\{children\}/,
    );
  });
});
