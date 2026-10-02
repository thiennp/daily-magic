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

const approveMock = vi.mocked(approveProjectAccessRequest);

describe("redeemProjectInvite suggestedProjectDisplayName", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(listProjectPeersBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
  });

  it("auto-approves active when suggestion is unique and valid (invite-as-consent)", async () => {
    let insertedSuggestion: unknown = undefined;
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("FROM project_memberships") && q.includes("lower(trim")) return [];
      if (q.includes("FROM project_access_requests") && q.includes("suggested_project_display_name")) {
        return [];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        insertedSuggestion = values[8];
        return [redeemSuggestPendingRow("Soft Vale")];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    approveMock.mockResolvedValue({
      ok: true,
      request: {
        ...redeemSuggestPendingRow("Soft Vale"),
        status: "approved",
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
        role: "member",
        status: "active",
        teamLabel: null,
        scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
        projectDisplayName: "Soft Vale",
        createdAt: "2026-10-02T00:00:00.000Z",
        revokedAt: null,
      },
      projectApiKey: "awc_proj_test",
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("active");
    expect(result.namingRequired).toBe(false);
    expect(result.suggestedProjectDisplayName).toBe("Soft Vale");
    expect(insertedSuggestion).toBe("Soft Vale");
    expect(approveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        requestId: "req-1",
        ownerUserId: "owner-1",
        projectDisplayName: "Soft Vale",
      }),
    );
    if (result.status === "active") {
      expect(result.membership.id).toBe("mem-1");
      expect(result.projectApiKey).toBe("awc_proj_test");
    }
  });

  it("omitting suggestion keeps pending for agents (naming required)", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("UPDATE project_invites") && q.includes("uses_remaining = uses_remaining - 1")) {
        return [REDEEM_SUGGEST_INVITE_ROW];
      }
      if (q.includes("INSERT INTO project_access_requests")) {
        expect(values[8]).toBeNull();
        return [redeemSuggestPendingRow(null)];
      }
      if (q.includes("INSERT INTO project_access_audit")) return [];
      return [];
    });
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(result.namingRequired).toBe(true);
    expect(result.suggestedProjectDisplayName).toBeNull();
    expect(approveMock).not.toHaveBeenCalled();
  });
});
