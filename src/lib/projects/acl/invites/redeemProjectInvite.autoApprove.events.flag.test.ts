import { readFileSync } from "node:fs";
import { join } from "node:path";

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
import { listProjectInviteAutoApproveEvents } from "@/lib/projects/acl/invites/listProjectInviteAutoApproveEvents";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sqlMock = vi.fn();
const eventRows: Record<string, unknown>[] = [];

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

describe("test-flag / manual Approve skip auto-approve events", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    eventRows.length = 0;
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    vi.mocked(resolveAgentLinkedOwnerUserId).mockResolvedValue("owner-1");
    vi.mocked(getUserProjectById).mockResolvedValue(redeemAutoApproveBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  });

  it("test-flag-only activation does not write member_auto_approved", async () => {
    process.env.AWC_TEST_AUTO_APPROVE_JOINS = "1";
    stubRedeemAutoApproveSql(sqlMock, false);
    const inner = sqlMock.getMockImplementation();
    sqlMock.mockImplementation(
      async (strings: TemplateStringsArray, ...values: unknown[]) => {
        const q = String(strings);
        if (q.includes("INSERT INTO project_invite_auto_approve_events")) {
          eventRows.push({ project_id: String(values[1]) });
          return [];
        }
        if (q.includes("FROM project_invite_auto_approve_events")) {
          return eventRows.filter((r) => r.project_id === values[0]);
        }
        if (typeof inner === "function") {
          return inner(strings, ...values);
        }
        return [];
      },
    );
    approveMock.mockResolvedValue(redeemAutoApproveApprovedPayload);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("active");
    expect(await listProjectInviteAutoApproveEvents("proj-1")).toEqual([]);
  });

  it("manual Approve path does not call the event writer", () => {
    const approveSrc = readFileSync(
      join(process.cwd(), "src/lib/projects/acl/approveProjectAccessRequest.ts"),
      "utf8",
    );
    const insertSrc = readFileSync(
      join(process.cwd(), "src/lib/projects/acl/insertApprovedMembership.ts"),
      "utf8",
    );
    expect(approveSrc).not.toContain("recordProjectInviteAutoApproveEvent");
    expect(insertSrc).not.toContain("recordProjectInviteAutoApproveEvent");
  });
});
