import { describe, expect, it } from "vitest";

import { parseResultSummary } from "@/lib/projects/tasks/parseProjectTaskFieldValues";
import { PROJECT_TASK_RESULT_SUMMARY_MAX_CHARS } from "@/lib/projects/tasks/projectTaskTools.constant";

describe("parseResultSummary", () => {
  it("accepts text, clears on blank, rejects non-strings and long text", () => {
    expect(parseResultSummary("Found 3 options")).toEqual({
      ok: true,
      value: "Found 3 options",
    });
    expect(parseResultSummary("  ")).toEqual({ ok: true, value: null });
    expect(parseResultSummary(5)).toEqual({
      ok: false,
      code: "invalid_result_summary",
    });
    expect(
      parseResultSummary("x".repeat(PROJECT_TASK_RESULT_SUMMARY_MAX_CHARS + 1)),
    ).toEqual({ ok: false, code: "result_summary_too_long" });
  });
});
