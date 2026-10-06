import {
  REDEEM_SUGGEST_INVITE_ROW,
  redeemSuggestPendingRow,
} from "@/lib/projects/acl/invites/redeemSuggestedName.fixtures";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

export const redeemAutoApproveInviteRow = (autoApprove: boolean) => ({
  ...REDEEM_SUGGEST_INVITE_ROW,
  auto_approve: autoApprove,
});

export const redeemAutoApproveApprovedPayload = {
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

export const redeemAutoApproveBaseProject = listProjectPeersBaseProject;

export const stubRedeemAutoApproveSql = (
  sqlMock: { mockImplementation: (fn: unknown) => void },
  autoApprove: boolean,
) => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
    if (
      q.includes("UPDATE project_invites") &&
      q.includes("uses_remaining = uses_remaining - 1")
    ) {
      return [redeemAutoApproveInviteRow(autoApprove)];
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
