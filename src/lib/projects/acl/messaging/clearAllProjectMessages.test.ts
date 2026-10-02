import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearAllProjectMessages } from "@/lib/projects/acl/messaging/clearAllProjectMessages";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";

const sqlMock = vi.fn();
const writeAudit = vi.fn(async () => undefined);
const getUserProjectById = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (...args: unknown[]) => getUserProjectById(...args),
}));

vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: (...args: unknown[]) => writeAudit(...args),
}));

describe("clearAllProjectMessages", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    writeAudit.mockClear();
    getUserProjectById.mockReset();
    resetProjectAclSchemaEnsureForTests();
    getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
  });

  it("requires confirm:true", async () => {
    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: false,
    });
    expect(result).toEqual({ ok: false, code: "confirm_required" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("forbids non-owners", async () => {
    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "member-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("returns not_found when project missing", async () => {
    getUserProjectById.mockResolvedValueOnce(null);
    const result = await clearAllProjectMessages({
      projectId: "missing",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });

  it("wipes messages+deliveries, audits msg.clear, and is idempotent at 0", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_memberships")) return [];
      if (q.includes("DELETE FROM project_message_deliveries")) {
        return [{ id: "d1" }, { id: "d2" }];
      }
      if (q.includes("DELETE FROM project_messages")) {
        return [{ id: "m1" }];
      }
      return [];
    });

    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(result).toEqual({
      ok: true,
      deletedMessages: 1,
      deletedDeliveries: 2,
    });
    expect(writeAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        actorUserId: "owner-1",
        action: "msg.clear",
        detail: expect.objectContaining({
          deletedMessages: 1,
          deletedDeliveries: 2,
        }),
      }),
    );

    const deliveryDeletes = sqlMock.mock.calls.filter((call) =>
      String(call[0]).includes("DELETE FROM project_message_deliveries"),
    );
    const messageDeletes = sqlMock.mock.calls.filter((call) => {
      const q = String(call[0]);
      return (
        q.includes("DELETE FROM project_messages") &&
        q.includes("project_id") &&
        !q.includes("make_interval") &&
        !q.includes("DELETE FROM project_message_deliveries")
      );
    });
    expect(deliveryDeletes.length).toBe(1);
    expect(messageDeletes.length).toBe(1);
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("DELETE FROM project_membership_webhooks"),
      ),
    ).toBe(false);

    sqlMock.mockReset();
    writeAudit.mockClear();
    resetProjectAclSchemaEnsureForTests();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_memberships")) return [];
      if (q.includes("DELETE FROM")) return [];
      return [];
    });
    const second = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(second).toEqual({
      ok: true,
      deletedMessages: 0,
      deletedDeliveries: 0,
    });
  });
});
