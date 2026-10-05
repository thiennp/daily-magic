import { beforeEach, describe, expect, it, vi } from "vitest";

import { ackProjectMessage } from "@/lib/projects/acl/messaging/ackProjectMessage";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const sqlMock = vi.fn();
const deleteWithOutcome = vi.hoisted(() => vi.fn());

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

vi.mock("@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome", () => ({
  deleteProjectMessageWithOutcome: (input: unknown) => deleteWithOutcome(input),
}));

describe("ackProjectMessage delete-on-ack", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    deleteWithOutcome.mockReset();
    deleteWithOutcome.mockResolvedValue({ ok: true, messageId: "msg-1" });
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("hard-deletes immediately via outcome helper", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
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
      return [];
    });

    const result = await ackProjectMessage({
      messageId: "msg-1",
      actorUserId: "bot-1",
    });
    expect(result).toEqual({ ok: true, messageId: "msg-1" });
    expect(deleteWithOutcome).toHaveBeenCalledWith({
      messageId: "msg-1",
      deletedReason: "ack",
      finalB2bState: "acked",
    });
  });
});
