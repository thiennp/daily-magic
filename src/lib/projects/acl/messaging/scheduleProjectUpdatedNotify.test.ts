import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectUpdatedNotifyPendingFakeSql } from "@/lib/projects/acl/messaging/projectUpdatedNotifyPendingFakeSql.fixtures";
import { PROJECT_UPDATED_DEBOUNCE_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const fake = vi.hoisted(() => ({ sql: null as unknown }));
const notifyMock = vi.hoisted(() => vi.fn(async (_input: unknown): Promise<{ notifiedPeerCount: number }> => ({ notifiedPeerCount: 1 })));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock(
  "@/lib/projects/acl/messaging/notifyProjectMembersOfProjectUpdated",
  () => ({
    notifyProjectMembersOfProjectUpdated: (input: unknown) =>
      notifyMock(input),
  }),
);

import { resetProjectUpdatedNotifyPendingSchemaEnsureForTests } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";
import { flushDueProjectUpdatedNotifies } from "@/lib/projects/acl/messaging/flushDueProjectUpdatedNotifies";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

const t0 = new Date("2026-10-05T08:00:00.000Z");
const at = (ms: number): Date => new Date(t0.getTime() + ms);

describe("scheduleProjectUpdatedNotify debounce", () => {
  let db = createProjectUpdatedNotifyPendingFakeSql();

  beforeEach(() => {
    notifyMock.mockClear();
    resetProjectUpdatedNotifyPendingSchemaEnsureForTests();
    db = createProjectUpdatedNotifyPendingFakeSql();
    fake.sql = db.sql;
  });

  it("collapses a burst into one notify after the trailing window", async () => {
    await scheduleProjectUpdatedNotify({
      projectId: "proj-1",
      fields: ["knowledge"],
      actorUserId: "owner-1",
      now: at(0),
    });
    await scheduleProjectUpdatedNotify({
      projectId: "proj-1",
      fields: ["folder_refs"],
      now: at(1_000),
    });
    await scheduleProjectUpdatedNotify({
      projectId: "proj-1",
      fields: ["repo_urls", "knowledge"],
      now: at(2_000),
    });

    expect(notifyMock).not.toHaveBeenCalled();
    expect(db.pending.get("proj-1")?.state).toBe("pending");
    expect(db.pending.get("proj-1")?.flush_after.getTime()).toBe(
      at(2_000).getTime() + PROJECT_UPDATED_DEBOUNCE_MS,
    );

    // Window not elapsed yet (trailing from last schedule at +2s → due at +7s)
    expect(
      await flushDueProjectUpdatedNotifies({ now: at(6_000) }),
    ).toBe(0);
    expect(notifyMock).not.toHaveBeenCalled();

    expect(
      await flushDueProjectUpdatedNotifies({ now: at(7_000) }),
    ).toBe(1);
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(notifyMock.mock.calls[0]?.[0] as Record<string, unknown>).toEqual(
      expect.objectContaining({
        projectId: "proj-1",
        actorUserId: "owner-1",
        fields: expect.arrayContaining([
          "knowledge",
          "folder_refs",
          "repo_urls",
        ]),
      }),
    );
    expect(db.pending.has("proj-1")).toBe(false);
  });

  it("flush immediately when the window is already elapsed (debounceMs 0)", async () => {
    await scheduleProjectUpdatedNotify({
      projectId: "proj-2",
      fields: ["project_info"],
      now: at(0),
      debounceMs: 0,
    });
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(db.pending.has("proj-2")).toBe(false);
  });

  it("does not schedule unknown fields", async () => {
    const result = await scheduleProjectUpdatedNotify({
      projectId: "proj-3",
      fields: ["nope"],
      now: at(0),
    });
    expect(result).toEqual({ scheduled: false });
    expect(db.pending.size).toBe(0);
    expect(notifyMock).not.toHaveBeenCalled();
  });
});
