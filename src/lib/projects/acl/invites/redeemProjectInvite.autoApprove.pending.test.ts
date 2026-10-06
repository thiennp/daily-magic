import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  redeemAutoApproveBaseProject,
  stubRedeemAutoApproveSql,
} from "@/lib/projects/acl/invites/redeemProjectInvite.autoApprove.fixtures";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
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

describe("redeemProjectInvite autoApprove pending paths", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    linkedOwnerMock.mockReset();
    linkedOwnerMock.mockResolvedValue("owner-1");
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(redeemAutoApproveBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  });

  it("plain redeem with display name stays pending until owner Approves", async () => {
    stubRedeemAutoApproveSql(sqlMock, false);
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

  it("autoApprove on + unclaimed bot stays pending", async () => {
    stubRedeemAutoApproveSql(sqlMock, true);
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
