import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  redeemAutoApproveApprovedPayload,
  redeemAutoApproveBaseProject,
  stubRedeemAutoApproveSql,
} from "@/lib/projects/acl/invites/redeemProjectInvite.autoApprove.fixtures";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

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

describe("redeemProjectInvite autoApprove active path", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    auditMock.mockReset();
    linkedOwnerMock.mockReset();
    linkedOwnerMock.mockResolvedValue("owner-1");
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(redeemAutoApproveBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  });

  it("autoApprove on + claimed bot returns active and writes activity audit", async () => {
    stubRedeemAutoApproveSql(sqlMock, true);
    approveMock.mockResolvedValue(redeemAutoApproveApprovedPayload);
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
});
