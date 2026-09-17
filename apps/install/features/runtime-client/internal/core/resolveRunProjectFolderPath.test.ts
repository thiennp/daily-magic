import { describe, expect, it } from "vitest";

import { resolveRunProjectFolderPath } from "./resolveRunProjectFolderPath";

describe("resolveRunProjectFolderPath", () => {
  it("uses trimmed project folder when provided", () => {
    expect(
      resolveRunProjectFolderPath("  ~/Projects/foo  ", () => "~/Default"),
    ).toBe("~/Projects/foo");
  });

  it("falls back to default resolver when empty", () => {
    expect(resolveRunProjectFolderPath("   ", () => "~/Default")).toBe(
      "~/Default",
    );
    expect(resolveRunProjectFolderPath(undefined, () => "~/Default")).toBe(
      "~/Default",
    );
  });

  it("requires a folder when projectId is set", () => {
    expect(
      resolveRunProjectFolderPath(undefined, () => "~/Default", "proj-1"),
    ).toBeNull();
    expect(
      resolveRunProjectFolderPath("~/app", () => "~/Default", "proj-1"),
    ).toBe("~/app");
  });
});
