import { describe, expect, it } from "vitest";

import { dropRepeatedReportBodyLines } from "@/features/projects/reports/utils/dropRepeatedReportBodyLines";

describe("dropRepeatedReportBodyLines (85e73e72)", () => {
  it("keeps the first copy of a re-printed checkpoint block", () => {
    expect(
      dropRepeatedReportBodyLines(
        [
          "### Checkpoint 1",
          "We are ready to implement.",
          "### Checkpoint 1",
          "We are ready to implement.",
          "## Summary",
          "Added dark mode.",
        ].join("\n"),
      ),
    ).toBe(
      [
        "### Checkpoint 1",
        "We are ready to implement.",
        "## Summary",
        "Added dark mode.",
      ].join("\n"),
    );
  });

  it("keeps short repeated lines", () => {
    expect(dropRepeatedReportBodyLines("- ok\n- ok")).toBe("- ok\n- ok");
  });
});
