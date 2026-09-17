import { describe, expect, it } from "vitest";

import { resolveNamespacedHarnessCursorRelativePath } from "../apps/live/features/projects/internal/core/resolveNamespacedHarnessCursorRelativePath";

describe("resolveNamespacedHarnessCursorRelativePath", () => {
  it("namespaces rules under the harness set slug", () => {
    expect(
      resolveNamespacedHarnessCursorRelativePath(
        "fsa-architecture",
        "rules/demo.mdc",
      ),
    ).toBe("rules/fsa-architecture/demo.mdc");
  });
});
