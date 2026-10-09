import { describe, expect, it } from "vitest";

import {
  buildProjectTaskPeopleOptions,
  filterProjectTaskRecordsByPeople,
  PROJECT_TASK_UNASSIGNED,
} from "@/features/projects/tasks/utils/projectTaskPeopleFilter";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const task = (
  id: string,
  createdBy: string | null,
  owner: string | null,
  ownerName: string | null = null,
) =>
  ({
    id,
    createdByMembershipId: createdBy,
    ownerMembershipId: owner,
    ownerDisplayName: ownerName,
  }) as ProjectTaskRecord;

const RECORDS = [
  task("a", "u1", "b1", "Bot One"),
  task("b", "u1", null),
  task("c", "u2", "b1", "Bot One"),
  task("d", null, "gone", "Old Bot"),
];
const ids = (rs: readonly ProjectTaskRecord[]) => rs.map((r) => r.id);

describe("filterProjectTaskRecordsByPeople", () => {
  it("keeps everything with no filter", () => {
    expect(
      ids(
        filterProjectTaskRecordsByPeople(RECORDS, {
          creatorId: "",
          assigneeId: "",
        }),
      ),
    ).toEqual(["a", "b", "c", "d"]);
  });
  it("filters by creator", () => {
    expect(
      ids(
        filterProjectTaskRecordsByPeople(RECORDS, {
          creatorId: "u1",
          assigneeId: "",
        }),
      ),
    ).toEqual(["a", "b"]);
  });
  it("filters by assignee and by unassigned", () => {
    expect(
      ids(
        filterProjectTaskRecordsByPeople(RECORDS, {
          creatorId: "",
          assigneeId: "b1",
        }),
      ),
    ).toEqual(["a", "c"]);
    expect(
      ids(
        filterProjectTaskRecordsByPeople(RECORDS, {
          creatorId: "",
          assigneeId: PROJECT_TASK_UNASSIGNED,
        }),
      ),
    ).toEqual(["b"]);
  });
  it("combines creator and assignee", () => {
    expect(
      ids(
        filterProjectTaskRecordsByPeople(RECORDS, {
          creatorId: "u1",
          assigneeId: "b1",
        }),
      ),
    ).toEqual(["a"]);
  });
});

describe("buildProjectTaskPeopleOptions", () => {
  it("names people from seats, else the task's owner name, else Former member", () => {
    const { creators, assignees } = buildProjectTaskPeopleOptions(RECORDS, [
      { id: "u1", label: "Una" },
      { id: "b1", label: "Bot One · Assistant" },
    ]);
    expect(creators.map((p) => p.label)).toEqual(["Former member", "Una"]);
    expect(assignees.map((p) => p.label)).toEqual([
      "Bot One · Assistant",
      "Old Bot",
    ]);
  });
});
