import { describe, expect, it } from "vitest";

import {
  projectTaskChangeNeedsConfirm as needsConfirm,
  projectTaskStatusChoices,
} from "@/features/projects/tasks/utils/projectTaskRecordChange";

const working = { status: "in_progress", ownerMembershipId: "a" } as const;

describe("projectTaskStatusChoices", () => {
  it("offers the current status plus the allowed moves only", () => {
    expect(projectTaskStatusChoices("done")).toEqual(["done", "queued"]);
    expect(projectTaskStatusChoices("blocked")).toEqual([
      "blocked",
      "in_progress",
      "queued",
    ]);
  });
});

describe("projectTaskChangeNeedsConfirm", () => {
  it("confirms stopping or reassigning in-progress work", () => {
    expect(needsConfirm(working, { status: "queued" })).toBe(true);
    expect(needsConfirm(working, { ownerMembershipId: "b" })).toBe(true);
    expect(needsConfirm(working, { ownerMembershipId: null })).toBe(true);
  });
  it("does not confirm harmless edits or other statuses", () => {
    expect(needsConfirm(working, { status: "done" })).toBe(false);
    expect(needsConfirm(working, { priority: "p1" })).toBe(false);
    expect(needsConfirm(working, { ownerMembershipId: "a" })).toBe(false);
    expect(
      needsConfirm(
        { status: "queued", ownerMembershipId: "a" },
        { ownerMembershipId: "b" },
      ),
    ).toBe(false);
  });
});
