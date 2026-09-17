import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("UpdateLocalMacModal", () => {
  it("HOME-040 / AGENT-050: personalized connect command copy and loading state", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "UpdateLocalMacModal.tsx"),
      "utf8",
    );

    expect(source).toContain("includes your account link");
    expect(source).toContain("replaces your local install files");
    expect(source).toContain("Preparing your install command");
    expect(source).not.toContain("repairs your");
  });
});
