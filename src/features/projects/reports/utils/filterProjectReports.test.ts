import { describe, expect, it } from "vitest";

import {
  applyProjectReportFilters,
  countReportsByStatus,
  NO_REPORT_FILTERS,
} from "@/features/projects/reports/utils/filterProjectReports";
import type { ProjectReportRow } from "@/features/projects/reports/utils/buildProjectReportRows";

const row = (over: Partial<ProjectReportRow>): ProjectReportRow =>
  ({
    id: "1",
    title: "Fix login",
    from: "Thien",
    statusKind: "done",
    toolId: "codex",
    ...over,
  }) as ProjectReportRow;

const rows = [
  row({ id: "1" }),
  row({ id: "2", statusKind: "failed", toolId: "claude-cli" }),
  row({ id: "3", statusKind: "waiting", title: "Deploy" }),
];

describe("applyProjectReportFilters", () => {
  it("ANDs status, tool and query", () => {
    const ids = (f: Partial<typeof NO_REPORT_FILTERS>): string[] =>
      applyProjectReportFilters(rows, { ...NO_REPORT_FILTERS, ...f }).map(
        (r) => r.id,
      );
    expect(ids({})).toEqual(["1", "2", "3"]);
    expect(ids({ status: "failed" })).toEqual(["2"]);
    expect(ids({ status: "needs" })).toEqual(["3"]);
    expect(ids({ tool: "codex" })).toEqual(["1", "3"]);
    expect(ids({ tool: "codex", query: "deploy" })).toEqual(["3"]);
  });

  it("counts ignore the status chip but respect tool", () => {
    expect(countReportsByStatus(rows, NO_REPORT_FILTERS)).toEqual({
      all: 3,
      done: 1,
      failed: 1,
      running: 0,
      needs: 1,
    });
    expect(
      countReportsByStatus(rows, { ...NO_REPORT_FILTERS, tool: "claude-cli" })
        .all,
    ).toBe(1);
  });
});
