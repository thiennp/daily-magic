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

const inboxRow = {
  id: "msg-1",
  kind: "task.done",
  summary: "msg-0: shipped",
  refs: {},
  sender_membership_id: "mem-bot",
  sender_display_name: "Builder",
  created_at: "2026-10-05T08:00:00.000Z",
  acked_at: null,
  grok_wake_result: null,
};

const seatFor = (role: "member" | "viewer", memberKind: "human" | "bot") =>
  ({
    id: `mem-${role}`,
    role,
    memberKind,
    status: "active",
    teamLabel: null,
    scopes: [],
    projectDisplayName: null,
  }) as never;

describe("listProjectInbox for human seats", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    resetProjectMessagePurgeForTests();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      String(strings).includes("FROM project_messages m") ? [inboxRow] : [],
    );
  });

  it.each([
    ["viewer", "human"],
    ["member", "human"],
    ["member", "bot"],
  ] as const)("%s (%s) can read its inbox", async (role, memberKind) => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(
      seatFor(role, memberKind),
    );
    const result = await listProjectInbox({
      projectId: "proj-1",
      actorUserId: "user-1",
    });
    expect(result.ok).toBe(true);
    expect(result.ok && result.messages.map((m) => m.messageId)).toEqual([
      "msg-1",
    ]);
  });

  it("non-member non-owner stays forbidden", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    expect(
      await listProjectInbox({ projectId: "proj-1", actorUserId: "stranger" }),
    ).toEqual({ ok: false, code: "forbidden" });
  });
});
