import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { ACL_APPROVE_REQUEST_ROW } from "@/lib/projects/acl/projectAclRequestApprove.fixtures";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { isAgentSameProjectOwner } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  isAgentUserId: vi.fn(async () => true),
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: vi.fn(),
}));
vi.mock("@/lib/agentAccess/resolveAgentLinkedOwnerUserId", () => ({
  isAgentSameProjectOwner: vi.fn(),
  resolveAgentLinkedOwnerUserId: vi.fn(),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

const approveMock = vi.mocked(approveProjectAccessRequest);
const sameOwnerMock = vi.mocked(isAgentSameProjectOwner);

describe("createProjectAccessRequest same-owner (silent auto-approve removed)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    sameOwnerMock.mockReset();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("FROM project_memberships") && q.includes("lower(trim")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("suggested_project_display_name")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        return [{ ...ACL_APPROVE_REQUEST_ROW, suggested_project_display_name: "Dark C" }];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
  });

  it("stays pending when not same-owner linked", async () => {
    sameOwnerMock.mockResolvedValue(false);
    const result = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
      suggestedProjectDisplayName: "Dark C",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
  });

  it("stays pending when same-owner linked and display name present", async () => {
    sameOwnerMock.mockResolvedValue(true);
    approveMock.mockResolvedValue({
      ok: true,
      request: {
        id: "req-1",
        projectId: "proj-1",
        requesterUserId: "bot-1",
        invitedByUserId: null,
        reason: null,
        requestedScopes: ["acl:self"],
        status: "approved",
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
        role: "member",
        status: "active",
        teamLabel: null,
        scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
        projectDisplayName: "Dark C",
        createdAt: "2026-10-02T00:00:00.000Z",
        revokedAt: null,
      },
      projectApiKey: "awc_proj_x",
    });
    const result = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
      suggestedProjectDisplayName: "Dark C",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
  });

  it("stays pending when same-owner but agent has no display name", async () => {
    sameOwnerMock.mockResolvedValue(true);
    const result = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
  });
});
