import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectUpdatedNotifyPendingFakeSql } from "@/lib/projects/acl/messaging/projectUpdatedNotifyPendingFakeSql.fixtures";
import { PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS } from "@/lib/projects/acl/messaging/projectUpdatedNotifyReclaim.constants";

const fake = vi.hoisted(() => ({ sql: null as unknown }));
const notifyMock = vi.hoisted(() =>
  vi.fn(
    async (_input: unknown): Promise<{ notifiedPeerCount: number }> => ({
      notifiedPeerCount: 1,
    }),
  ),
);

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

const t0 = new Date("2026-10-05T08:00:00.000Z");
const at = (ms: number): Date => new Date(t0.getTime() + ms);

describe("flushDueProjectUpdatedNotifies failure/reclaim", () => {
  let db = createProjectUpdatedNotifyPendingFakeSql();

  beforeEach(() => {
    notifyMock.mockReset();
    notifyMock.mockResolvedValue({ notifiedPeerCount: 1 });
    resetProjectUpdatedNotifyPendingSchemaEnsureForTests();
    db = createProjectUpdatedNotifyPendingFakeSql();
    fake.sql = db.sql;
  });

  it("per-row try/catch: failure leaves row flushed; peers still flush", async () => {
    db.pending.set("proj-fail", {
      project_id: "proj-fail",
      state: "pending",
      fields: ["knowledge"],
      actor_user_id: "owner-1",
      flush_after: at(0),
      updated_at: at(0),
    });
    db.pending.set("proj-ok", {
      project_id: "proj-ok",
      state: "pending",
      fields: ["repo_urls"],
      actor_user_id: "owner-2",
      flush_after: at(0),
      updated_at: at(0),
    });
    notifyMock.mockImplementation(async (input: unknown) => {
      const row = input as { projectId: string };
      if (row.projectId === "proj-fail") {
        throw new Error("notify boom");
      }
      return { notifiedPeerCount: 1 };
    });

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const flushed = await flushDueProjectUpdatedNotifies({ now: at(1_000) });
    errorSpy.mockRestore();

    expect(flushed).toBe(1);
    expect(db.pending.get("proj-fail")?.state).toBe("flushed");
    expect(db.pending.has("proj-ok")).toBe(false);
  });

  it("reclaims flushed rows older than ~60s then notifies", async () => {
    db.pending.set("proj-stale", {
      project_id: "proj-stale",
      state: "flushed",
      fields: ["folder_refs"],
      actor_user_id: "owner-1",
      flush_after: at(0),
      updated_at: at(0),
    });

    const tooSoon = at(PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS - 1_000);
    expect(await flushDueProjectUpdatedNotifies({ now: tooSoon })).toBe(0);
    expect(db.pending.get("proj-stale")?.state).toBe("flushed");
    expect(notifyMock).not.toHaveBeenCalled();

    // Reclaim needs flushed.updated_at < now - 60s, then claim needs
    // pending.flush_after <= now. After reclaim, flush_after is still at(0).
    const afterReclaim = at(PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS + 1_000);
    expect(await flushDueProjectUpdatedNotifies({ now: afterReclaim })).toBe(1);
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(db.pending.has("proj-stale")).toBe(false);
  });
});
