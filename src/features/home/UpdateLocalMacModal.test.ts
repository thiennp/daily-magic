import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("UpdateLocalMacModal", () => {
  it("AGENT-050: describes stop, replace, and restart instead of repair", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "UpdateLocalMacModal.tsx"),
      "utf8",
    );

    expect(source).toContain("stops the running background services");
    expect(source).toContain("replaces your local install files");
    expect(source).not.toContain("repairs your");
  });
});
