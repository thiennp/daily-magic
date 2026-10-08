import { describe, expect, it } from "vitest";

import { resolveAgentRunTaskTitle } from "@/lib/dispatch/buildAgentRunInputContext";

describe("resolveAgentRunTaskTitle", () => {
  it("uses the first line of the original task and drops appended rules", () => {
    expect(
      resolveAgentRunTaskTitle("\nRead BRIEF.md.\nThen build.\n---\nRules"),
    ).toBe("Read BRIEF.md.");
  });

  it("truncates long first lines", () => {
    expect(resolveAgentRunTaskTitle("a".repeat(300))?.length).toBe(160);
  });

  it("returns null for an empty prompt", () => {
    expect(resolveAgentRunTaskTitle("  \n ")).toBeNull();
  });
});
