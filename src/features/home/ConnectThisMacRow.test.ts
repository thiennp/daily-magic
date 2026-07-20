import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("ConnectThisMacRow", () => {
  it("HOME-027: sizes the monitor icon so it cannot blow up the mobile layout", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "ConnectThisMacRow.tsx"),
      "utf8",
    );

    expect(source).toContain("resolveMacDeviceIconClassName");
    expect(source).toContain('"mt-0.5 h-4 w-4 shrink-0"');
  });
});
