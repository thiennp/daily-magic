import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("homeSetupSectionShellClasses", () => {
  it("HOME-039: disables scroll anchoring on expanded setup content", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "homeSetupSectionShellClasses.constant.ts",
      ),
      "utf8",
    );

    expect(source).toContain("[overflow-anchor:none]");
  });
});
