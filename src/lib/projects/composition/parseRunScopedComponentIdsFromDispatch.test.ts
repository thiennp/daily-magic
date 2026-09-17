import { describe, expect, it } from "vitest";

import parseRunScopedComponentIdsFromDispatch from "@/lib/projects/composition/parseRunScopedComponentIdsFromDispatch";

describe("parseRunScopedComponentIdsFromDispatch", () => {
  it("dedupes and trims component ids", () => {
    expect(
      parseRunScopedComponentIdsFromDispatch({
        runScopedComponentIds: [" a ", "a", "", "b"],
      }),
    ).toEqual(["a", "b"]);
  });

  it("returns empty when missing", () => {
    expect(parseRunScopedComponentIdsFromDispatch({})).toEqual([]);
  });
});
