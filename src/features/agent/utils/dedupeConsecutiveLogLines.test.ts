import { describe, expect, it } from "vitest";

import { dedupeConsecutiveLogLines } from "@/features/agent/utils/dedupeConsecutiveLogLines";

describe("dedupeConsecutiveLogLines", () => {
  it("removes identical consecutive lines", () => {
    const input = [
      "[agent-witch] marketplace plan/estimate falling back to claude-cli (Writer API key missing)",
      "[agent-witch] marketplace plan/estimate falling back to claude-cli (Writer API key missing)",
      "[agent-witch] marketplace plan/estimate falling back to claude-cli (Writer API key missing)",
      "done",
    ].join("\n");

    expect(dedupeConsecutiveLogLines(input)).toBe(
      [
        "[agent-witch] marketplace plan/estimate falling back to claude-cli (Writer API key missing)",
        "done",
      ].join("\n"),
    );
  });

  it("preserves non-consecutive duplicates", () => {
    const input = "a\nb\na\n";
    expect(dedupeConsecutiveLogLines(input)).toBe("a\nb\na\n");
  });
});
