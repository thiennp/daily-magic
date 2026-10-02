import { beforeEach, describe, expect, it, vi } from "vitest";

import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => ({
    id: "mem-recv",
    projectId: "proj-1",
    userId: "bot-1",
    role: "member",
    status: "active",
    teamLabel: "builders",
    scopes: ["msg:dispatch"],
    projectDisplayName: "Buni",
    createdAt: "2026-10-01T00:00:00.000Z",
    revokedAt: null,
  })),
}));

vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

describe("ackProjectMessage delete-on-ack", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("hard-deletes the message row instead of setting acked_at", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("DELETE FROM project_messages") && q.includes("make_interval")) {
        return [];
      }
      if (q.includes("SELECT * FROM project_messages")) {
        return [
          {
            id: "msg-1",
            project_id: "proj-1",
            to_user_id: "bot-1",
            to_team_label: null,
            acked_at: null,
          },
        ];
      }
      if (q.includes("DELETE FROM project_messages")) {
        return [];
      }
      return [];
    });

    const result = await ackProjectMessage({
      messageId: "msg-1",
      actorUserId: "bot-1",
    });
    expect(result).toEqual({ ok: true, messageId: "msg-1" });

    const deleteCalls = sqlMock.mock.calls.filter((call) => {
      const q = String(call[0]);
      return q.includes("DELETE FROM project_messages") && !q.includes("make_interval");
    });
    expect(deleteCalls.length).toBe(1);
    expect(
      sqlMock.mock.calls.some((call) => String(call[0]).includes("acked_at = NOW()")),
    ).toBe(false);
  });
});
