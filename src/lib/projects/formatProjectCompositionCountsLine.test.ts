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
    ).toBe("3 Harness · 2 Workflows · 5 Agents");
  });
});
