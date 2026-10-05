import { describe, expect, it } from "vitest";

import { isProjectPitfallLimitExceeded } from "@/features/project-pitfalls/internal/core/isProjectPitfallLimitExceeded";
import { pitfallViewFixture } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";

const activeViews = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    pitfallViewFixture({ id: `p-${index}` }),
  );

describe("isProjectPitfallLimitExceeded", () => {
  it("rejects a 65th active pitfall", () => {
    expect(
      isProjectPitfallLimitExceeded({
        merged: activeViews(64),
        candidate: { id: "new-one", source: "project" },
      }),
    ).toBe(true);
  });

  it("allows the 64th, edits of active ids, and retiring", () => {
    expect(
      isProjectPitfallLimitExceeded({
        merged: activeViews(63),
        candidate: { id: "new-one", source: "project" },
      }),
    ).toBe(false);
    expect(
      isProjectPitfallLimitExceeded({
        merged: activeViews(64),
        candidate: { id: "p-3", source: "project" },
      }),
    ).toBe(false);
    expect(
      isProjectPitfallLimitExceeded({
        merged: activeViews(64),
        candidate: { id: "new-one", source: "retired" },
      }),
    ).toBe(false);
  });

  it("does not count retired rows toward the cap", () => {
    const merged = [
      ...activeViews(63),
      pitfallViewFixture({ id: "gone", source: "retired" }),
    ];
    expect(
      isProjectPitfallLimitExceeded({
        merged,
        candidate: { id: "gone", source: "project" },
      }),
    ).toBe(false);
  });
});
