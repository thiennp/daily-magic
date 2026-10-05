import { describe, expect, it } from "vitest";

import formatProjectPathTruncation from "@/features/projects/utils/formatProjectPathTruncation";

describe("formatProjectPathTruncation", () => {
  it("keeps ~/ at the start when truncating (no rtl flip)", () => {
    const path =
      "~/.agent-witch/profiles/thien@example.com/projects/wake-test";
    const { display, full } = formatProjectPathTruncation(path, 40);
    expect(full).toBe(path);
    expect(display.startsWith("~/")).toBe(true);
    expect(display.endsWith("wake-test")).toBe(true);
    expect(display.includes("…")).toBe(true);
    expect(display).not.toMatch(/\.\.~\/$/);
    expect(display).not.toMatch(/wake-test\.~\//);
  });

  it("returns the full path when short enough", () => {
    const path = "~/code/infusion";
    expect(formatProjectPathTruncation(path)).toEqual({
      display: path,
      full: path,
    });
  });

  it("preserves a short head so home-relative paths stay readable", () => {
    const path = "~/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/bbbbbbbbbbbbbbbb/cccc";
    const { display } = formatProjectPathTruncation(path, 36);
    expect(display.startsWith("~/")).toBe(true);
    expect(display.length).toBeLessThanOrEqual(36);
  });
});
