import { describe, expect, it } from "vitest";

import {
  findOpenTasksForAssistant,
  resolveCreateTaskTarget,
} from "@/features/projects/messenger/oneWindow/oneWindowCreateTask";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const bots = [
  { membershipId: "m1", displayName: "Ada" },
  { membershipId: "m2", displayName: "Bo" },
];
const task = (over: Partial<ProjectTaskRecord>): ProjectTaskRecord =>
  ({
    id: "t",
    ownerMembershipId: "m1",
    status: "in_progress",
    updatedAt: "2026-01-01",
    ...over,
  }) as ProjectTaskRecord;

describe("resolveCreateTaskTarget", () => {
  const base = { assistants: bots, mentionsEnabled: true, feedKey: "whole" };
  it("prefers the @mention", () => {
    expect(resolveCreateTaskTarget({ ...base, text: "@Bo fix it" })).toEqual({
      membershipId: "m2",
      mentioned: true,
    });
  });
  it("uses the open private feed", () => {
    expect(
      resolveCreateTaskTarget({ ...base, text: "fix", feedKey: "m1" }),
    ).toEqual({ membershipId: "m1", mentioned: false });
  });
  it("uses the only assistant, else nobody", () => {
    expect(
      resolveCreateTaskTarget({ ...base, text: "x", assistants: [bots[0]] }),
    ).toEqual({ membershipId: "m1", mentioned: false });
    expect(resolveCreateTaskTarget({ ...base, text: "x" })).toBeNull();
  });
});

describe("findOpenTasksForAssistant", () => {
  it("keeps only the assistant's open tasks, newest first", () => {
    const found = findOpenTasksForAssistant(
      [
        task({ id: "old", updatedAt: "2026-01-01" }),
        task({ id: "new", updatedAt: "2026-02-01", status: "queued" }),
        task({ id: "done", status: "done" }),
        task({ id: "other", ownerMembershipId: "m2" }),
      ],
      "m1",
    );
    expect(found.map((t) => t.id)).toEqual(["new", "old"]);
  });
});
