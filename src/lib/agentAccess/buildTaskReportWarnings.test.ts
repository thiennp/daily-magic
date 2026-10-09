import { describe, expect, it } from "vitest";

import { buildTaskReportWarnings } from "@/lib/agentAccess/buildTaskReportWarnings";

const base = {
  args: { status: "in_progress" },
  taskStatus: "in_progress",
  resultSummary: null,
  hadRecentLookup: null as boolean | null,
};

describe("buildTaskReportWarnings", () => {
  it("warns when work starts with no recent library lookup", () => {
    expect(
      buildTaskReportWarnings({ ...base, hadRecentLookup: false })[0],
    ).toMatch(/No library lookup/);
  });

  it("stays quiet after a lookup, when the log is unreadable, or for other updates", () => {
    expect(buildTaskReportWarnings({ ...base, hadRecentLookup: true })).toEqual(
      [],
    );
    expect(buildTaskReportWarnings(base)).toEqual([]);
    expect(
      buildTaskReportWarnings({
        ...base,
        args: { title: "x" },
        hadRecentLookup: false,
      }),
    ).toEqual([]);
  });

  it("warns about a one-word resultSummary on done, not about a real one", () => {
    const done = { ...base, args: { status: "done" }, taskStatus: "done" };
    expect(
      buildTaskReportWarnings({ ...done, resultSummary: "done" })[0],
    ).toMatch(/only 4 characters/);
    expect(
      buildTaskReportWarnings({
        ...done,
        resultSummary: "Fixed the login redirect; reuse the cookie helper.",
      }),
    ).toEqual([]);
  });
});
