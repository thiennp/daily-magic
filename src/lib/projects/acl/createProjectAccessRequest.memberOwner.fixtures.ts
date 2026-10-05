import { vi } from "vitest";

import { ACL_APPROVE_REQUEST_ROW } from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

export const memberOwnerActiveApproveResult = {
  ok: true as const,
  request: {
    id: "req-1",
    projectId: "proj-1",
    requesterUserId: "bot-1",
    invitedByUserId: null,
    reason: null,
    requestedScopes: ["acl:self"] as const,
    status: "approved" as const,
    decidedByUserId: "owner-1",
    decidedAt: "2026-10-02T00:00:00.000Z",
    createdAt: "2026-10-02T00:00:00.000Z",
    expiresAt: "2026-10-16T00:00:00.000Z",
    inviteId: null,
    teamLabel: null,
    suggestedProjectDisplayName: "Dark C",
  },
  membership: {
    id: "mem-1",
    projectId: "proj-1",
    userId: "bot-1",
    role: "member" as const,
    status: "active" as const,
    teamLabel: null,
    scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"] as const,
    projectDisplayName: "Dark C",
    createdAt: "2026-10-02T00:00:00.000Z",
    revokedAt: null,
  },
  projectApiKey: "awc_proj_x",
};

export const memberOwnerHumanSeat = (
  role: "member" | "viewer" | "owner",
) => ({
  id: "hm-1",
  projectId: "proj-1",
  userId: "human-member-1",
  role,
  status: "active" as const,
  memberKind: "human" as const,
  teamLabel: null,
  scopes: [] as const,
  projectDisplayName: "Alex",
  createdAt: "2026-10-01T00:00:00.000Z",
  revokedAt: null,
});

export const installMemberOwnerSqlMock = (sqlMock: ReturnType<typeof vi.fn>) => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
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
      return [
        {
          ...ACL_APPROVE_REQUEST_ROW,
          suggested_project_display_name: "Dark C",
        },
      ];
    }
    if (q.includes("INSERT INTO project_access_audit")) return [];
    return [];
  });
};
