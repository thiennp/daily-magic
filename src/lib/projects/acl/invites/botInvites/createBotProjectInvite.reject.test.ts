import { beforeEach, describe, expect, it, vi } from "vitest";

import { countAgentAccessBucketAttempts, recordAgentAccessBucketAttempt } from "@/lib/agentAccess/consumeAgentAccessBucket";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { BOT_INVITE_PROJECT, BOT_INVITER_MEMBERSHIP } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";
import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn(async () => []);
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/projects/userProjectQueries", () => ({ getUserProjectById: vi.fn() }));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({ isAgentUserId: vi.fn() }));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({ getActiveProjectMembership: vi.fn() }));
vi.mock("@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser", () => ({ isBotLinkedToOwnerUser: vi.fn() }));
vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  countAgentAccessBucketAttempts: vi.fn(async () => 0),
  recordAgentAccessBucketAttempt: vi.fn(async () => undefined),
}));
vi.mock("@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds", () => ({
  readAgentAccessBucketRetryAfterSeconds: vi.fn(async () => 900),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({ ensureProjectAclSchema: vi.fn() }));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({ writeProjectActivityEvent: vi.fn() }));

const create = (extra: Record<string, unknown> = {}) =>
  createBotProjectInvite({ projectId: "proj-1", actorUserId: "bot-inviter", ...extra });

const expectNoInvite = () => {
  expect(sqlMock).not.toHaveBeenCalled();
  expect(vi.mocked(writeProjectActivityEvent)).not.toHaveBeenCalled();
};

describe("createBotProjectInvite rejects (403-class)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getUserProjectById).mockResolvedValue(BOT_INVITE_PROJECT);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    vi.mocked(getActiveProjectMembership).mockResolvedValue(BOT_INVITER_MEMBERSHIP);
    vi.mocked(isBotLinkedToOwnerUser).mockResolvedValue(true);
    vi.mocked(countAgentAccessBucketAttempts).mockResolvedValue(0);
  });

  it("unknown project → not_found", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);
    expect(await create()).toEqual({ ok: false, code: "not_found" });
  });

  it("human or owner actor → inviter_not_bot", async () => {
    vi.mocked(isAgentUserId).mockResolvedValue(false);
    expect(await create()).toEqual({ ok: false, code: "inviter_not_bot" });
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    expect(await create({ actorUserId: "owner-1" })).toEqual({ ok: false, code: "inviter_not_bot" });
    expectNoInvite();
  });

  it("computer seat → inviter_not_bot", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue({ ...BOT_INVITER_MEMBERSHIP, memberKind: "computer" });
    expect(await create()).toEqual({ ok: false, code: "inviter_not_bot" });
  });

  it("non-member, pending or revoked bot → inviter_not_member", async () => {
    vi.mocked(getActiveProjectMembership).mockResolvedValue(null);
    expect(await create()).toEqual({ ok: false, code: "inviter_not_member" });
    expectNoInvite();
  });

  it("bot not claimed by the project owner → inviter_not_same_owner", async () => {
    vi.mocked(isBotLinkedToOwnerUser).mockResolvedValue(false);
    expect(await create()).toEqual({ ok: false, code: "inviter_not_same_owner" });
    expect(vi.mocked(isBotLinkedToOwnerUser)).toHaveBeenCalledWith({ botUserId: "bot-inviter", ownerUserId: "owner-1" });
    expectNoInvite();
  });

  it("owner/admin role or elevated scopes → role_not_allowed / scope_exceeds_inviter", async () => {
    expect(await create({ role: "owner" })).toEqual({ ok: false, code: "role_not_allowed" });
    expect(await create({ role: "admin" })).toEqual({ ok: false, code: "role_not_allowed" });
    expect(await create({ scopes: ["folder_ref:propose"] })).toEqual({ ok: false, code: "scope_exceeds_inviter" });
    expect(vi.mocked(recordAgentAccessBucketAttempt)).not.toHaveBeenCalled();
    expectNoInvite();
  });

  it("per-inviter limit (5/h) → rate_limited inviter, nothing recorded", async () => {
    vi.mocked(countAgentAccessBucketAttempts).mockResolvedValueOnce(5).mockResolvedValueOnce(0);
    expect(await create()).toEqual({ ok: false, code: "rate_limited", scope: "inviter", retryAfterSeconds: 900 });
    expect(vi.mocked(recordAgentAccessBucketAttempt)).not.toHaveBeenCalled();
    expectNoInvite();
  });

  it("per-project limit (20/h) → rate_limited project", async () => {
    vi.mocked(countAgentAccessBucketAttempts).mockResolvedValueOnce(1).mockResolvedValueOnce(20);
    const result = await create();
    expect(result).toMatchObject({ ok: false, code: "rate_limited", scope: "project" });
    expectNoInvite();
  });
});
