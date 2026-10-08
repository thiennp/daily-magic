import { describe, expect, it } from "vitest";

import { buildProjectTaskChangeNotices as build } from "@/lib/projects/tasks/buildProjectTaskChangeNotices";
import { projectTaskRecordFixture as task } from "@/lib/projects/tasks/projectTask.fixtures";

const base = task({
  id: "abcdef12-0000",
  title: "Ship it",
  status: "in_progress",
  priority: "p1",
  ownerMembershipId: "seat-a",
  ownerDisplayName: "Agent A",
});
const run = (
  after: Partial<typeof base>,
  extra: Partial<Parameters<typeof build>[0]> = {},
) =>
  build({
    before: base,
    after: { ...base, ...after },
    actorLabel: "Owner",
    actorMembershipId: null,
    dependents: [],
    ...extra,
  });

describe("buildProjectTaskChangeNotices", () => {
  it("In progress → To do by the owner tells the owning agent to stop", () => {
    const n = run({ status: "queued" });
    expect(n).toHaveLength(1);
    expect(n[0]).toMatchObject({ membershipId: "seat-a" });
    expect(n[0]?.summary).toContain("moved back to To do by Owner");
    expect(n[0]?.summary).toContain("Stop work");
    expect(n[0]?.summary).toContain("[abcdef12]");
  });

  it("reassigning stops the old owner and hands it to the new one", () => {
    const n = run({ ownerMembershipId: "seat-b", ownerDisplayName: "Bot B" });
    expect(n.map((x) => x.membershipId).sort()).toEqual(["seat-a", "seat-b"]);
    expect(n.find((x) => x.membershipId === "seat-a")?.summary).toContain(
      "given to Bot B",
    );
    expect(n.find((x) => x.membershipId === "seat-b")?.summary).toContain(
      "assigned to you",
    );
  });

  it("never tells the actor, and title-only edits tell nobody", () => {
    expect(run({ status: "queued" }, { actorMembershipId: "seat-a" })).toEqual(
      [],
    );
    expect(run({ title: "Renamed", description: "x" })).toEqual([]);
  });

  it("priority change tells the current owner", () => {
    const n = run({ priority: "p0" });
    expect(n[0]?.summary).toContain("priority is now p0");
  });

  it("done / blocked tells owners of waiting tasks once, skipping finished ones", () => {
    const dependents = [
      { title: "Next", status: "queued" as const, ownerMembershipId: "seat-c" },
      {
        title: "Next 2",
        status: "queued" as const,
        ownerMembershipId: "seat-c",
      },
      { title: "Old", status: "done" as const, ownerMembershipId: "seat-d" },
    ];
    const n = run({ status: "done" }, { dependents });
    expect(n.map((x) => x.membershipId).sort()).toEqual(["seat-a", "seat-c"]);
    expect(run({ status: "queued" }, { dependents })).toHaveLength(1);
  });

  it("keeps every summary within the message cap", () => {
    const long = "T".repeat(500);
    const n = build({
      before: { ...base, title: long },
      after: { ...base, title: long, status: "queued" },
      actorLabel: "O".repeat(300),
      actorMembershipId: null,
      dependents: [],
    });
    expect(n[0]?.summary.length).toBeLessThanOrEqual(200);
  });
});
