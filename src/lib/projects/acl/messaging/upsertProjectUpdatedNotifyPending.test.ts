import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectUpdatedNotifyPendingFakeSql } from "@/lib/projects/acl/messaging/projectUpdatedNotifyPendingFakeSql.fixtures";

const fake = vi.hoisted(() => ({ sql: null as unknown }));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { resetProjectUpdatedNotifyPendingSchemaEnsureForTests } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

const t0 = new Date("2026-10-05T08:00:00.000Z");
const at = (ms: number): Date => new Date(t0.getTime() + ms);

describe("upsertProjectUpdatedNotifyPending ON CONFLICT", () => {
  let db = createProjectUpdatedNotifyPendingFakeSql();

  beforeEach(() => {
    resetProjectUpdatedNotifyPendingSchemaEnsureForTests();
    db = createProjectUpdatedNotifyPendingFakeSql();
    fake.sql = db.sql;
  });

  it("while flushed replaces fields (does not append)", async () => {
    db.pending.set("proj-4", {
      project_id: "proj-4",
      state: "flushed",
      fields: ["knowledge", "folder_refs"],
      actor_user_id: "owner-1",
      flush_after: at(0),
      updated_at: at(0),
    });
    await scheduleProjectUpdatedNotify({
      projectId: "proj-4",
      fields: ["repo_urls"],
      now: at(1_000),
    });
    expect(db.pending.get("proj-4")).toEqual(
      expect.objectContaining({ state: "pending", fields: ["repo_urls"] }),
    );
  });

  it("while pending still appends fields", async () => {
    await scheduleProjectUpdatedNotify({
      projectId: "proj-5", fields: ["knowledge"], now: at(0),
    });
    await scheduleProjectUpdatedNotify({
      projectId: "proj-5", fields: ["repo_urls"], now: at(500),
    });
    expect(db.pending.get("proj-5")?.fields).toEqual([
      "knowledge",
      "repo_urls",
    ]);
  });
});
