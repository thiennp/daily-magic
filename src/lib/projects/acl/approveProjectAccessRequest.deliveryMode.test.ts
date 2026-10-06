import { beforeEach, describe, expect, it, vi } from "vitest";

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  ACL_APPROVE_MEMBER_ROW,
  ACL_APPROVE_REQUEST_ROW,
} from "@/lib/projects/acl/projectAclRequestApprove.fixtures";

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
  mintProjectApiKey: vi.fn(async () => ({
    ok: true,
    keyId: "key-1",
    plaintext: "awc_proj_test",
    prefix: "awc_proj_",
    last4: "test",
    scopes: ["acl:self"],
  })),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
    deviceId: "mac-1",
    name: "Demo",
    folderPath: "/tmp/demo",
    repoUrls: [],
    defaultBranch: null,
    lastUsedAt: null,
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
  })),
}));

const stubSql = () =>
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("FROM project_access_requests") && q.includes("pending")) {
      return [{ ...ACL_APPROVE_REQUEST_ROW, status: "pending", invite_id: "inv-9" }];
    }
    if (q.includes("WITH approved_request AS")) {
      return [
        {
          request_row: {
            ...ACL_APPROVE_REQUEST_ROW,
            status: "approved",
            invite_id: "inv-9",
          },
          member_row: { ...ACL_APPROVE_MEMBER_ROW, project_display_name: "Coder" },
        },
      ];
    }
    return [];
  });

describe("join calls resolveInitialProjectMembershipDeliveryMode", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    applyMode.mockClear();
    isAgent.mockResolvedValue(true);
    resetProjectAclSchemaEnsureForTests();
  });

  it("bot join applies the connect-time mode with the request's invite", async () => {
    stubSql();
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
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
    stubSql();
    const approved = await approveProjectAccessRequest({
      projectId: "proj-1",
      requestId: "req-1",
      ownerUserId: "owner-1",
      projectDisplayName: "Coder",
    });
    expect(approved.ok).toBe(true);
    expect(applyMode).not.toHaveBeenCalled();
  });
});
