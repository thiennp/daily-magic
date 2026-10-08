import { describe, expect, it } from "vitest";

import {
  buildProjectReportRows,
  filterProjectReportRows,
} from "@/features/projects/reports/utils/buildProjectReportRows";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const run = (over: Partial<EnrichedAgentRunRecord>): EnrichedAgentRunRecord =>
  ({
    id: "r1",
    projectId: "p1",
    prompt: "\n  Fix the login bug\nmore",
    reportSummary: null,
    executorName: "Thien",
    executorEmail: "t@example.com",
    createdAt: "2026-10-01T00:00:00Z",
    ...over,
  }) as EnrichedAgentRunRecord;

describe("buildProjectReportRows", () => {
  it("keeps only this project's runs", () => {
    const rows = buildProjectReportRows(
      [
        run({}),
        run({ id: "r2", projectId: "p2" }),
        run({ id: "r3", projectId: null }),
      ],
      "p1",
    );
    expect(rows.map((row) => row.id)).toEqual(["r1"]);
  });

  it("title: the user's prompt first line, else the summary (f4bf6a0c)", () => {
    expect(buildProjectReportRows([run({})], "p1")[0].title).toBe(
      "Fix the login bug",
    );
    expect(
      buildProjectReportRows([run({ reportSummary: "Shipped fix" })], "p1")[0]
        .title,
    ).toBe("Fix the login bug");
    expect(
      buildProjectReportRows(
        [run({ prompt: "", reportSummary: "Shipped fix" })],
        "p1",
      )[0].title,
    ).toBe("Shipped fix");
    expect(
      buildProjectReportRows([run({ prompt: "", reportSummary: "" })], "p1")[0]
        .title,
    ).toBe("Report");
  });

  it("from: executor name, email, else Unknown (cache rows carry ids)", () => {
    const from = (over: Partial<EnrichedAgentRunRecord>): string =>
      buildProjectReportRows([run(over)], "p1")[0].from;
    expect(from({})).toBe("Thien");
    expect(from({ executorName: null })).toBe("t@example.com");
    expect(from({ executorName: null, executorEmail: "user-uuid" })).toBe(
      "Unknown",
    );
  });

  it("searches by title or who ran it", () => {
    const rows = buildProjectReportRows(
      [run({}), run({ id: "r2", executorName: "Muse", prompt: "Docs" })],
      "p1",
    );
    expect(filterProjectReportRows(rows, "login")).toHaveLength(1);
    expect(filterProjectReportRows(rows, "muse")).toHaveLength(1);
    expect(filterProjectReportRows(rows, " ")).toHaveLength(2);
  });
});
