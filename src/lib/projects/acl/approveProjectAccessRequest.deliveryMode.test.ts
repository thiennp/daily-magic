import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import {
  APPROVE_DELIVERY_MODE_API_KEY,
  APPROVE_DELIVERY_MODE_PROJECT,
  stubApproveDeliveryModeSql,
} from "@/lib/projects/acl/approveProjectAccessRequest.deliveryMode.fixtures";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { ACL_APPROVE_MEMBER_ROW } from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

const sqlMock = vi.fn();
const applyMode = vi.fn<(input: unknown) => Promise<"poll">>(
  async () => "poll",
);
const isAgent = vi.fn(async () => true);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  isAgentUserId: () => isAgent(),
  loadUserProfilesByIds: vi.fn(async () => new Map()),
}));
vi.mock(
  "@/lib/projects/acl/applyInitialProjectMembershipDeliveryMode",
  () => ({
    applyInitialProjectMembershipDeliveryMode: (input: unknown) =>
      applyMode(input),
  }),
);
vi.mock("@/lib/projects/acl/projectApiKeys/mintProjectApiKey", () => ({
  mintProjectApiKey: vi.fn(async () => APPROVE_DELIVERY_MODE_API_KEY),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => APPROVE_DELIVERY_MODE_PROJECT),
}));

describe("join calls resolveInitialProjectMembershipDeliveryMode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    applyMode.mockClear();
    isAgent.mockResolvedValue(true);
    resetProjectAclSchemaEnsureForTests();
  });

  it("bot join applies the connect-time mode with the request's invite", async () => {
    stubApproveDeliveryModeSql(sqlMock);
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
      approvalSource: "owner",
      projectDisplayName: "Coder",
    });
    expect(approved.ok).toBe(true);
    if (!approved.ok) return;
    expect(applyMode).toHaveBeenCalledTimes(1);
    expect(applyMode).toHaveBeenCalledWith({
      projectId: "proj-1",
      membershipId: String(ACL_APPROVE_MEMBER_ROW.id),
      inviteId: "inv-9",
    });
    expect(approved.membership.deliveryMode).toBe("poll");
  });

  it("human requester: no delivery_mode write", async () => {
    isAgent.mockResolvedValue(false);
    stubApproveDeliveryModeSql(sqlMock);
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
      approvalSource: "owner",
      projectDisplayName: "Coder",
    });
    expect(approved.ok).toBe(true);
    expect(applyMode).not.toHaveBeenCalled();
  });
});
