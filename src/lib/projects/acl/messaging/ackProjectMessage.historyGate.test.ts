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

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
  })),
}));

describe("ackProjectMessage keep-300 stamp (was history gate)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
  });

  it("stamps acked_at and never deletes", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("SELECT state FROM project_computer_history_settings")) {
        return [{ state: "on_ready" }];
      }
      if (q.includes("SELECT * FROM project_messages")) {
        return [
          {
            id: "msg-1",
            project_id: "proj-1",
            to_user_id: "bot-1",
            to_team_label: null,
            created_at: new Date().toISOString(),
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
    const queries = sqlMock.mock.calls.map((call) => String(call[0]));
    expect(
      queries.some(
        (q) =>
          q.includes("DELETE FROM project_messages") &&
          !q.includes("make_interval"),
      ),
    ).toBe(false);
    expect(queries.some((q) => q.includes("SET acked_at = COALESCE"))).toBe(
      true,
    );
  });
});
