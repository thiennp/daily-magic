import { describe, expect, it } from "vitest";

import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";

describe("formatProjectCompositionCountsLine", () => {
  it("formats UX v2 chip line", () => {
    expect(
      formatProjectCompositionCountsLine({
        harness: 3,
        workflow: 2,
        agent: 5,
      }),
    ).toBe("3 Playbooks · 2 Workflows · 5 Agents");
  });

  it("MF-03: hides line when all counts are zero", () => {
    expect(
      formatProjectCompositionCountsLine({
        harness: 0,
        workflow: 0,
        agent: 0,
      }),
    ).toBeNull();
  });
});
