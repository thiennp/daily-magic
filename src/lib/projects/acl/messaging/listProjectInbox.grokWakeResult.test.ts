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

const messageRow = (grokWakeResult: string | null) => ({
  id: "msg-1",
  kind: "task.assign",
  summary: "wake me",
  refs: {},
  sender_membership_id: null,
  sender_display_name: null,
  created_at: "2026-10-04T08:00:00.000Z",
  acked_at: null,
  grok_wake_result: grokWakeResult,
  webhook_url: "https://secret.example/hook",
  bearer_retained: "sekret-bearer",
});

describe("listProjectInbox grok wake result", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    sqlMock.mockResolvedValue([]);
  });

  it("returns the caller's grok wake result and not another membership's", async () => {
    vi.mocked(getActiveProjectMembership).mockImplementation(
      async (_projectId, userId) =>
        userId === "member-1"
          ? ({ id: "mem-1", teamLabel: "ops" } as never)
          : ({ id: "mem-2", teamLabel: "ops" } as never),
    );
    sqlMock.mockImplementation(
      async (strings: TemplateStringsArray, ...values: unknown[]) => {
        const query = String(strings);
        if (!query.includes("FROM project_messages m")) return [];
        const callerMembershipId = values.includes("mem-1")
          ? "mem-1"
          : values.includes("mem-2")
            ? "mem-2"
            : null;
        return [
          messageRow(
            callerMembershipId === "mem-1"
              ? "http_200"
              : callerMembershipId === "mem-2"
                ? null
                : "fetch_failed",
          ),
        ];
      },
    );

    const recipient = await listProjectInbox({
      projectId: "proj-1",
      actorUserId: "member-1",
    });
    const otherMember = await listProjectInbox({
      projectId: "proj-1",
      actorUserId: "member-2",
    });

    expect(recipient.ok).toBe(true);
    expect(otherMember.ok).toBe(true);
    if (!recipient.ok || !otherMember.ok) return;
    expect(recipient.messages[0]?.grokWakeResult).toBe("http_200");
    expect(otherMember.messages[0]?.grokWakeResult).toBeNull();
    expect(JSON.stringify(otherMember.messages)).not.toContain("http_200");
    expect(JSON.stringify(recipient.messages)).not.toContain("secret.example");
    expect(JSON.stringify(recipient.messages)).not.toContain("sekret-bearer");

    await listProjectInbox({
      projectId: "proj-1",
      actorUserId: "member-1",
      since: "2026-10-01T00:00:00.000Z",
    });
    const inboxCalls = sqlMock.mock.calls.filter((call) =>
      String(call[0]).includes("FROM project_messages m"),
    );
    expect(inboxCalls).toHaveLength(3);
    for (const call of inboxCalls) {
      const query = String(call[0]);
      expect(query).toContain("a.membership_id");
      expect(query).toContain("project_grok_routine_wake_attempts");
      expect(query).not.toContain("webhook_url");
      expect(query).not.toContain("bearer");
    }
    expect(inboxCalls[0]?.slice(1)).toContain("mem-1");
    expect(inboxCalls[0]?.slice(1)).not.toContain("mem-2");
    expect(inboxCalls[1]?.slice(1)).toContain("mem-2");
    expect(inboxCalls[1]?.slice(1)).not.toContain("mem-1");
  });
});
