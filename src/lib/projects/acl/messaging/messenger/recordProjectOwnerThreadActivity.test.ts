import { beforeEach, describe, expect, it, vi } from "vitest";

import { recordProjectOwnerThreadActivity } from "@/lib/projects/acl/messaging/messenger/recordProjectOwnerThreadActivity";

const sqlMock = vi.fn();
const updates: unknown[][] = [];

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const record = (
  kind: string,
  ownerUserIds: readonly string[] = ["user-jordan"],
) =>
  recordProjectOwnerThreadActivity({
    projectId: "proj-trip",
    fromMembershipId: "mem-planner",
    ownerUserIds,
    kind,
    now: new Date("2026-10-05T08:10:00.000Z"),
  });

describe("recordProjectOwnerThreadActivity", () => {
  beforeEach(() => {
    updates.length = 0;
    sqlMock.mockReset();
    sqlMock.mockImplementation(
      async (strings: TemplateStringsArray, ...values: unknown[]) => {
        const text = strings.join("?");
        if (text.includes("SELECT d.id, d.b2b_state")) {
          expect(text).toContain("m.sender_membership_id IS NULL");
          return [
            { id: "d-waiting", b2b_state: "awaiting_first_activity" },
            { id: "d-final", b2b_state: "blocked_silent_10m" },
          ];
        }
        updates.push(values);
        return [{ id: values.at(-2) }];
      },
    );
  });

  it("bot reply to Owner moves the owner's watched deliveries; 10-min block stays final", async () => {
    expect(await record("task.done")).toEqual({ matched: 2, moved: 1 });
    expect(updates).toHaveLength(1);
    expect(updates[0]).toContain("done");
    expect(updates[0]).toContain("d-waiting");
  });

  it("no owner recipient → no query", async () => {
    expect(await record("task.done", [])).toEqual({ matched: 0, moved: 0 });
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
