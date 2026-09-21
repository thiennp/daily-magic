import { describe, expect, it } from "vitest";

import { filterHarnessItemsByKinds } from "@/features/workflows/filterHarnessItemsByKinds";

describe("filterHarnessItemsByKinds", () => {
  it("keeps items whose kind is in the allowlist", () => {
    expect(
      filterHarnessItemsByKinds(
        [
          { kind: "operator", id: "h" },
          { kind: "rule", id: "r" },
          { kind: "agent", id: "a" },
        ],
        ["operator", "agent"],
      ),
    ).toEqual([
      { kind: "operator", id: "h" },
      { kind: "agent", id: "a" },
    ]);
  });
});
