import { describe, expect, it } from "vitest";

import {
  resolveMemberTaskPulse,
  summarizeTaskOwnerPulses,
} from "@/features/projects/access/utils/resolveMemberTaskPulse";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const NOW = Date.parse("2026-10-09T12:00:00.000Z");
const minutesAgo = (n: number) => new Date(NOW - n * 60_000).toISOString();

const task = (over: Partial<ProjectTaskRecord>): ProjectTaskRecord =>
  ({
    id: "t1",
    title: "Fix invite email",
    status: "in_progress",
    ownerMembershipId: "m1",
    updatedAt: minutesAgo(1),
    ...over,
  }) as ProjectTaskRecord;

describe("resolveMemberTaskPulse", () => {
  it("is idle with no open task for that seat", () => {
    expect(resolveMemberTaskPulse([], "m1", NOW)).toEqual({ kind: "idle" });
    expect(
      resolveMemberTaskPulse(
        [task({ status: "done" }), task({ ownerMembershipId: "m2" })],
        "m1",
        NOW,
      ),
    ).toEqual({ kind: "idle" });
  });

  it("is working while an open task was updated inside the window", () => {
    const pulse = resolveMemberTaskPulse(
      [
        task({ updatedAt: minutesAgo(3) }),
        task({ id: "t2", status: "queued" }),
      ],
      "m1",
      NOW,
    );
    expect(pulse).toMatchObject({ kind: "working", openCount: 2 });
  });

  it("is quiet on the stalest in-progress task past the window", () => {
    const pulse = resolveMemberTaskPulse(
      [
        task({ id: "a", updatedAt: minutesAgo(9) }),
        task({ id: "b", title: "Older", updatedAt: minutesAgo(14) }),
      ],
      "m1",
      NOW,
    );
    expect(pulse).toEqual({
      kind: "quiet",
      taskId: "b",
      taskTitle: "Older",
      quietMinutes: 14,
    });
  });

  it("ignores stale queued, planned and blocked tasks", () => {
    const pulse = resolveMemberTaskPulse(
      [task({ status: "blocked", updatedAt: minutesAgo(60) })],
      "m1",
      NOW,
    );
    expect(pulse.kind).toBe("working");
  });
});

describe("summarizeTaskOwnerPulses", () => {
  it("lists each owner of an open task once, quiet first, skipping unowned and done", () => {
    const owners = summarizeTaskOwnerPulses(
      [
        task({
          id: "a",
          ownerMembershipId: "m1",
          ownerDisplayName: "Alice",
          updatedAt: minutesAgo(1),
        }),
        task({
          id: "b",
          ownerMembershipId: "m2",
          ownerDisplayName: "Bob",
          updatedAt: minutesAgo(20),
        }),
        task({
          id: "c",
          ownerMembershipId: "m2",
          ownerDisplayName: "Bob",
          status: "queued",
        }),
        task({ id: "d", ownerMembershipId: null }),
        task({ id: "e", ownerMembershipId: "m3", status: "done" }),
      ],
      NOW,
    );
    expect(owners.map((o) => [o.membershipId, o.name, o.pulse.kind])).toEqual([
      ["m2", "Bob", "quiet"],
      ["m1", "Alice", "working"],
    ]);
  });
});
