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

  it("stacks description and a full-width primary Connect this Mac button", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "ConnectThisMacRow.tsx"),
      "utf8",
    );

    expect(source).not.toContain("sm:flex-row");
    expect(source).toContain("flex flex-col gap-3");
    expect(source).toContain("APP_SURFACE_CTA_PRIMARY_SM_CLASS");
    expect(source).toContain("fullWidth");
    expect(source).toContain("w-full");
  });
});
