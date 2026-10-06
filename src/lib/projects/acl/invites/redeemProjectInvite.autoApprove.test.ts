import { beforeEach, describe, expect, it, vi } from "vitest";

import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";
import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: vi.fn(),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  isAgentUserId: vi.fn(async () => true),
}));
vi.mock("@/lib/agentAccess/resolveAgentLinkedOwnerUserId", () => ({
  resolveAgentLinkedOwnerUserId: vi.fn(async () => "owner-1"),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

const approveMock = vi.mocked(approveProjectAccessRequest);
const linkedOwnerMock = vi.mocked(resolveAgentLinkedOwnerUserId);
const auditMock = vi.mocked(writeProjectAccessAudit);

const inviteRow = (autoApprove: boolean) => ({
  ...REDEEM_SUGGEST_INVITE_ROW,
  auto_approve: autoApprove,
});

const stubSql = (autoApprove: boolean) => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
    if (
      q.includes("UPDATE project_invites") &&
      q.includes("uses_remaining = uses_remaining - 1")
    ) {
      return [inviteRow(autoApprove)];
    }
    if (q.includes("FROM project_memberships") && q.includes("lower(trim")) {
      return [];
    }
    if (
      q.includes("FROM project_access_requests") &&
      q.includes("suggested_project_display_name")
    ) {
      return [];
    }
    if (q.includes("INSERT INTO project_access_requests")) {
      return [redeemSuggestPendingRow("Soft Vale")];
    }
    if (q.includes("INSERT INTO project_access_audit")) return [];
    return [];
  });
};

const approvedPayload = {
  ok: true as const,
  request: {
    ...redeemSuggestPendingRow("Soft Vale"),
    status: "approved" as const,
    id: "req-1",
    projectId: "proj-1",
    requesterUserId: "bot-1",
    invitedByUserId: "owner-1",
    reason: "invite_redeem",
    requestedScopes: ["acl:self", "project:meta", "peer_sync"],
    decidedByUserId: "owner-1",
    decidedAt: "2026-10-02T00:00:00.000Z",
    createdAt: "2026-10-02T00:00:00.000Z",
    expiresAt: "2026-10-16T00:00:00.000Z",
    inviteId: "inv-1",
    teamLabel: null,
    suggestedProjectDisplayName: "Soft Vale",
  },
  membership: {
    id: "mem-1",
    projectId: "proj-1",
    userId: "bot-1",
    role: "member" as const,
    status: "active" as const,
    teamLabel: null,
    scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
    projectDisplayName: "Soft Vale",
    createdAt: "2026-10-02T00:00:00.000Z",
    revokedAt: null,
  },
  projectApiKey: "awc_proj_test",
};

describe("redeemProjectInvite autoApprove + claimed bot", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    auditMock.mockReset();
    linkedOwnerMock.mockReset();
    linkedOwnerMock.mockResolvedValue("owner-1");
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(listProjectPeersBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  });

  it("plain redeem with display name stays pending until owner Approves", async () => {
    stubSql(false);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
  });

  it("autoApprove on + claimed bot returns active and writes activity audit", async () => {
    stubSql(true);
    approveMock.mockResolvedValue(approvedPayload);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("active");
    expect(approveMock).toHaveBeenCalled();
    expect(auditMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "invite.auto_approve_redeem",
        detail: expect.objectContaining({
          inviteId: "inv-1",
          label: "inv-1".slice(0, 8),
          projectDisplayName: "Soft Vale",
        }),
      }),
    );
  });

  it("autoApprove on + unclaimed bot stays pending", async () => {
    stubSql(true);
    linkedOwnerMock.mockResolvedValue(null);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
  });
});
