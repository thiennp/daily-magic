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
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
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
const linkedOwnerMock = vi.mocked(resolveAgentLinkedOwnerUserId);

const wrapStub = (autoApprove: boolean) => {
  stubRedeemAutoApproveSql(sqlMock, autoApprove);
  const inner = sqlMock.getMockImplementation();
  sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const q = String(strings);
    if (q.includes("INSERT INTO project_invite_auto_approve_events")) {
      eventRows.push({
        id: String(values[0]),
        project_id: String(values[1]),
        invite_id: String(values[2]),
        invite_label: String(values[3]),
        event: String(values[4]),
        actor_user_id: values[5] ?? null,
        membership_id: values[6] ?? null,
        member_display_name: values[7] ?? null,
        created_at: "2026-10-06T12:00:00.000Z",
      });
      return [];
    }
    if (q.includes("FROM project_invite_auto_approve_events")) {
      return eventRows.filter((r) => r.project_id === values[0]);
    }
    if (typeof inner === "function") {
      return inner(strings, ...values);
    }
    return [];
  });
};

describe("redeem invite auto-approve durable events", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    eventRows.length = 0;
    resetProjectAclSchemaEnsureForTests();
    approveMock.mockReset();
    linkedOwnerMock.mockReset();
    linkedOwnerMock.mockResolvedValue("owner-1");
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue(redeemAutoApproveBaseProject);
    vi.mocked(isAgentUserId).mockResolvedValue(true);
    vi.mocked(writeProjectAccessAudit).mockReset();
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  });

  it("invite auto-approve redeem writes member_auto_approved with label + member", async () => {
    wrapStub(true);
    approveMock.mockResolvedValue(redeemAutoApproveApprovedPayload);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("active");
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events).toHaveLength(1);
    expect(events[0]?.event).toBe("member_auto_approved");
    expect(events[0]?.inviteLabel).toBe("inv-1".slice(0, 8));
    expect(events[0]?.membershipId).toBe("mem-1");
    expect(events[0]?.memberDisplayName).toBe("Soft Vale");
  });

  it("test-flag-only activation does not write member_auto_approved", async () => {
    process.env.AWC_TEST_AUTO_APPROVE_JOINS = "1";
    wrapStub(false);
    approveMock.mockResolvedValue(redeemAutoApproveApprovedPayload);
    const result = await redeemProjectInvite({
      token: "a".repeat(22),
      actorUserId: "bot-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.status).toBe("active");
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events).toEqual([]);
  });
});

describe("manual Approve writes no auto-approve event", () => {
  it("approveProjectAccessRequest path does not call the event writer", async () => {
    // Source-scan: insertApprovedMembership / approve path has no record call.
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
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
