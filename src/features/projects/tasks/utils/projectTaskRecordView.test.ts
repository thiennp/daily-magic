import { describe, expect, it } from "vitest";

import {
  countProjectTaskRecordsByTab,
  filterProjectTaskRecordsByTab,
  sortProjectTaskRecords,
} from "@/features/projects/tasks/utils/projectTaskRecordView";
import { projectTaskRecordFixture as task } from "@/lib/projects/tasks/projectTask.fixtures";

const records = [
  task({
    id: "a",
    title: "Bravo",
    status: "queued",
    priority: "p2",
    updatedAt: "2026-10-08T08:00:00Z",
  }),
  task({
    id: "b",
    title: "alpha",
    status: "in_progress",
    priority: "p0",
    updatedAt: "2026-10-08T09:00:00Z",
  }),
  task({
    id: "c",
    title: "Charlie",
    status: "done",
    priority: null,
    updatedAt: "2026-10-08T07:00:00Z",
  }),
  task({
    id: "d",
    title: "Delta",
    status: "blocked",
    priority: "p1",
    updatedAt: "2026-10-08T06:00:00Z",
  }),
  task({
    id: "e",
    title: "Echo",
    status: "queued",
    priority: null,
    updatedAt: "2026-10-08T10:00:00Z",
  }),
];
const ids = (rs: readonly { id: string }[]) => rs.map((r) => r.id).join("");

describe("projectTaskRecordView", () => {
  it("counts per tab, including all", () => {
    expect(countProjectTaskRecordsByTab(records)).toEqual({
      all: 5,
      in_progress: 1,
      blocked: 1,
      queued: 2,
      planned: 0,
      done: 1,
    });
  });

  it("filters by tab", () => {
    expect(ids(filterProjectTaskRecordsByTab(records, "queued"))).toBe("ae");
    expect(filterProjectTaskRecordsByTab(records, "all")).toBe(records);
    expect(filterProjectTaskRecordsByTab(records, "planned")).toEqual([]);
  });

  it("sorts by last updated, newest first", () => {
    expect(ids(sortProjectTaskRecords(records, "updated", "desc"))).toBe(
      "ebacd",
    );
    expect(ids(sortProjectTaskRecords(records, "updated", "asc"))).toBe(
      "dcabe",
    );
  });

  it("sorts by priority with unset priority always last", () => {
    expect(ids(sortProjectTaskRecords(records, "priority", "asc"))).toBe(
      "bdaec",
    );
    expect(ids(sortProjectTaskRecords(records, "priority", "desc"))).toBe(
      "adbec",
    );
  });

  it("sorts by status (active work first) and by title ignoring case", () => {
    expect(ids(sortProjectTaskRecords(records, "status", "asc"))).toBe("bdeac");
    expect(ids(sortProjectTaskRecords(records, "title", "asc"))).toBe("bacde");
  });

  it("does not mutate the input", () => {
    const copy = [...records];
    sortProjectTaskRecords(records, "title", "desc");
    expect(records).toEqual(copy);
  });
});
