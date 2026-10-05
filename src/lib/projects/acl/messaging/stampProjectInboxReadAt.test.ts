import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectInbox } from "@/lib/projects/acl/messaging/listProjectInbox";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

vi.mock("@/lib/projects/acl/messaging/checkProjectMessageSilence", () => ({
  checkProjectMessageSilence: vi.fn(async () => 0),
}));

describe("listProjectInbox stamps read_at without delete", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    vi.mocked(getActiveProjectMembership).mockResolvedValue({
      id: "mem-1",
      teamLabel: "ops",
    } as never);
  });

  it("updates read_at and never deletes on fetch", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("DELETE FROM project_messages") && q.includes("make_interval")) {
        return [];
      }
      if (q.includes("FROM project_messages m")) {
        return [
          {
            id: "msg-1",
            kind: "task.assign",
            summary: "hi",
            refs: {},
            sender_membership_id: "mem-a",
            sender_display_name: "A",
            created_at: "2026-10-05T08:00:00.000Z",
            acked_at: null,
            read_at: null,
            grok_wake_result: null,
          },
        ];
      }
      if (q.includes("SET read_at")) {
        return [{ id: "msg-1" }];
      }
      if (q.includes("DELETE FROM project_messages")) {
        throw new Error("inbox fetch must not delete");
      }
      return [];
    });

    const result = await listProjectInbox({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    expect(result).toEqual({
      ok: true,
      messages: [
        expect.objectContaining({
          messageId: "msg-1",
          readAt: null,
        }),
      ],
    });
    const stampCalls = sqlMock.mock.calls.filter((call) =>
      String(call[0]).includes("SET read_at"),
    );
    expect(stampCalls).toHaveLength(1);
    expect(
      sqlMock.mock.calls.some(
        (call) =>
          String(call[0]).includes("DELETE FROM project_messages") &&
          !String(call[0]).includes("make_interval"),
      ),
    ).toBe(false);
  });
});
