import { describe, expect, it } from "vitest";

import { isPathInsideFolder } from "./isPathInsideFolder";

describe("isPathInsideFolder", () => {
  it.each([
    ["/w/proj", "/w/proj", true],
    ["/w/proj/src/a", "/w/proj", true],
    ["/w/proj/..data", "/w/proj", true],
    ["/w/proj-evil", "/w/proj", false],
    ["/w/projX/file", "/w/proj", false],
    ["/w", "/w/proj", false],
    ["/etc/passwd", "/w/proj", false],
    ["relative/path", "/w/proj", false],
  ])("%s inside %s → %s", (candidate, folder, expected) => {
    expect(isPathInsideFolder(candidate, folder)).toBe(expected);
  });
});
