import { beforeEach, describe, expect, it, vi } from "vitest";

import { recordAgentAccessBucketAttempt } from "@/lib/agentAccess/consumeAgentAccessBucket";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  BOT_INVITE_PROJECT,
  BOT_INVITER_MEMBERSHIP,
  BOT_MADE_INVITE_ROW,
} from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";
import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById: vi.fn() }));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({ isAgentUserId: vi.fn() }));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({ getActiveProjectMembership: vi.fn() }));
vi.mock("@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser", () => ({ isBotLinkedToOwnerUser: vi.fn() }));
vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  countAgentAccessBucketAttempts: vi.fn(async () => 0),
  recordAgentAccessBucketAttempt: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({ ensureProjectAclSchema: vi.fn() }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({ writeProjectActivityEvent: vi.fn() }));

const NOW = Date.parse("2026-10-08T00:30:00.000Z");

describe("createBotProjectInvite happy path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUserProjectById).mockResolvedValue(BOT_INVITE_PROJECT);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(BOT_INVITER_MEMBERSHIP);
    vi.mocked(isBotLinkedToOwnerUser).mockResolvedValue(true);
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      String(strings).includes("INSERT INTO project_invites")
        ? [{ ...BOT_MADE_INVITE_ROW, uses_remaining: 1 }]
        : [],
    );
  });

  it("inserts a single-use, 30-min, non-auto-approve invite bound to owner + inviter seat", async () => {
    const result = await createBotProjectInvite({ projectId: "proj-1", actorUserId: "bot-inviter", nowMs: NOW });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.token.length).toBeGreaterThanOrEqual(16);
    expect(result.url).toContain(`/invite/p/${result.token}`);
    const insert = sqlMock.mock.calls.find((call) => String(call[0]).includes("INSERT INTO project_invites"));
    expect(insert).toBeDefined();
    const sqlText = String(insert?.[0]);
    expect(sqlText).toContain("created_by_membership_id, bound_owner_user_id");
    expect(sqlText).toContain("FALSE");
    expect(sqlText).not.toContain("token_ciphertext");
    const values = insert?.slice(1) ?? [];
    expect(values).toContain("bot-inviter");
    expect(values).toContain("mem-inviter");
    expect(values).toContain("owner-1");
    expect(values).toContain(1);
    expect(values).toContain("2026-10-08T01:00:00.000Z");
    expect(vi.mocked(recordAgentAccessBucketAttempt)).toHaveBeenCalledTimes(2);
  });

  it("writes an Access log invite.created row with the inviting bot as actor", async () => {
    await createBotProjectInvite({ projectId: "proj-1", actorUserId: "bot-inviter", nowMs: NOW });
    expect(vi.mocked(writeProjectActivityEvent)).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        type: "invite.created",
        actor: { kind: "member", userId: "bot-inviter", label: "Quiet Fox" },
        detail: expect.objectContaining({
          inviteId: "inv-bot-1",
          approvalSource: "bot_invite",
          autoApprove: false,
          maxUses: 1,
        }),
      }),
    );
  });
});
