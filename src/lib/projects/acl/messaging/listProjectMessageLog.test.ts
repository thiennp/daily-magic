import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectMessageLog } from "@/lib/projects/acl/messaging/listProjectMessageLog";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const sqlMock = vi.fn();
const getUserProjectById = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (...args: unknown[]) => getUserProjectById(...args),
}));

describe("listProjectMessageLog", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    getUserProjectById.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
    getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    });
  });

  it("forbids non-owners", async () => {
    const result = await listProjectMessageLog({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
  });

  it("returns full project log with sender/recipient names for owner", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_memberships")) return [];
      if (q.includes("DELETE FROM project_messages") && q.includes("make_interval")) {
        return [];
      }
      if (q.includes("FROM project_messages m")) {
        return [
          {
            id: "msg-peer",
            kind: "task.assign",
            summary: "peer handoff",
            refs: { prUrl: "https://example.com/pr/1" },
            sender_membership_id: "mem-a",
            sender_display_name: "AliceBot",
            to_membership_id: "mem-b",
            to_user_id: "user-b",
            to_team_label: null,
            to_project_display_name: "BobBot",
            recipient_display_name: "BobBot",
            created_at: "2026-10-02T10:00:00.000Z",
            acked_at: null,
          },
          {
            id: "msg-owner",
            kind: "task.assign",
            summary: "from owner",
            refs: {},
            sender_membership_id: null,
            sender_display_name: null,
            to_membership_id: "mem-a",
            to_user_id: "user-a",
            to_team_label: null,
            to_project_display_name: "AliceBot",
            recipient_display_name: "AliceBot",
            created_at: "2026-10-02T09:00:00.000Z",
            acked_at: "2026-10-02T09:05:00.000Z",
          },
        ];
      }
      return [];
    });

    const result = await listProjectMessageLog({
      projectId: "proj-1",
      actorUserId: "owner-1",
      limit: 50,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.scope).toBe("project");
    expect(result.nextCursor).toBeNull();
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]).toMatchObject({
      messageId: "msg-peer",
      fromProjectDisplayName: "AliceBot",
      toProjectDisplayName: "BobBot",
      kind: "task.assign",
      ackedAt: null,
    });
    expect(result.messages[1]).toMatchObject({
      messageId: "msg-owner",
      fromProjectDisplayName: "Owner",
      toProjectDisplayName: "AliceBot",
      ackedAt: "2026-10-02T09:05:00.000Z",
    });
  });
});
