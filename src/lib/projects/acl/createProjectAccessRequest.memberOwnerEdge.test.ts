import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectAccessRequest } from "@/lib/projects/acl/createProjectAccessRequest";
import {
  installMemberOwnerSqlMock,
  memberOwnerHumanSeat,
} from "@/lib/projects/acl/createProjectAccessRequest.memberOwner.fixtures";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import {
  isAgentSameProjectOwner,
  resolveAgentLinkedOwnerUserId,
} from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
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
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(async () => "none"),
}));

const approveMock = vi.mocked(approveProjectAccessRequest);
const sameOwnerMock = vi.mocked(isAgentSameProjectOwner);
const linkedOwnerMock = vi.mocked(resolveAgentLinkedOwnerUserId);
const membershipMock = vi.mocked(getActiveProjectMembership);

describe("createProjectAccessRequest member-owner auto-approve edges", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    sameOwnerMock.mockReset();
    linkedOwnerMock.mockReset();
    membershipMock.mockReset();
    sameOwnerMock.mockResolvedValue(false);
    linkedOwnerMock.mockResolvedValue("human-member-1");
    installMemberOwnerSqlMock(sqlMock);
  });

  it("stays pending when active seat is a bot membership not human", async () => {
    membershipMock.mockResolvedValue({
      ...memberOwnerHumanSeat("member"),
      memberKind: "bot",
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

  it("stays pending when bot has no linked human owner", async () => {
    linkedOwnerMock.mockResolvedValue(null);
    const result = await createProjectAccessRequest({
      projectId: "proj-1",
      requesterUserId: "bot-1",
      suggestedProjectDisplayName: "Dark C",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("pending");
    expect(approveMock).not.toHaveBeenCalled();
    expect(membershipMock).not.toHaveBeenCalled();
  });

  it("stays pending when member-owner but agent has no display name", async () => {
    membershipMock.mockResolvedValue(memberOwnerHumanSeat("member"));
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
