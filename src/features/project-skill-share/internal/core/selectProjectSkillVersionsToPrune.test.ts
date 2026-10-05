import { describe, expect, it } from "vitest";

import { selectProjectSkillVersionsToPrune } from "@/features/project-skill-share/internal/core/selectProjectSkillVersionsToPrune";

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("selectProjectSkillVersionsToPrune", () => {
  it("keeps ≤ 20 versions", () => {
    expect(
      selectProjectSkillVersionsToPrune({
        versions: range(20),
        keep: 20,
        protectedVersion: 20,
      }),
    ).toEqual([]);
    expect(
      selectProjectSkillVersionsToPrune({
        versions: range(21),
        keep: 20,
        protectedVersion: 21,
      }),
    ).toEqual([1]);
  });

  it("never drops the live published version", () => {
    expect(
      selectProjectSkillVersionsToPrune({
        versions: range(22),
        keep: 20,
        protectedVersion: 1,
      }),
    ).toEqual([2, 3]);
  });
});
