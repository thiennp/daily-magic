import { describe, expect, it } from "vitest";

import { resolveHarnessManifestItemCursorRelativePath } from "./resolveHarnessManifestItemCursorRelativePath";

describe("resolveHarnessManifestItemCursorRelativePath", () => {
  it("strips shared/items prefix", () => {
    expect(
      resolveHarnessManifestItemCursorRelativePath(
        "shared/items/rule-1/rules/demo.mdc",
      ),
    ).toBe("rules/demo.mdc");
  });

  it("accepts direct cursor-relative paths", () => {
    expect(
      resolveHarnessManifestItemCursorRelativePath("commands/foo.md"),
    ).toBe("commands/foo.md");
  });
});
