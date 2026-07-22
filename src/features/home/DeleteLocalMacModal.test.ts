import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("DeleteLocalMacModal", () => {
  it("uses a modal flow instead of window alert/confirm", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "DeleteLocalMacModal.tsx"),
      "utf8",
    );

    expect(source).toContain("<Modal");
    expect(source).toContain("DeleteLocalMacModalPhaseContent");
    expect(source).not.toContain("window.alert");
    expect(source).not.toContain("window.confirm");
  });
});
