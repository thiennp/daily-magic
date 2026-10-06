import { beforeEach, describe, expect, it, vi } from "vitest";

const writer = vi.hoisted(() => vi.fn(async () => undefined));
const approve = vi.hoisted(() =>
  vi.fn(async () => ({ ok: false, code: "not_pending" })),
);
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: approve,
}));
vi.mock("@/lib/projects/acl/invites/markMembershipAutoApprovedViaInvite", () => ({
  markMembershipAutoApprovedViaInvite: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/invites/dualWriteProjectInviteAutoApproveEvent", () => ({
  dualWriteProjectInviteAutoApproveEvent: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "proj-1", ownerUserId: "owner-1" })),
}));

import { tryAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/tryAutoApproveInviteRedeem";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const request = { id: "req-1", requesterUserId: "bot-1" } as ProjectAccessRequestRecord;
const membership = {
  id: "mem-1", userId: "bot-1", scopes: [], projectDisplayName: "Buni",
} as unknown as ProjectMembershipRecord;

describe("tryAutoApproveInviteRedeem flag-only Access log", () => {
  beforeEach(() => {
    writer.mockClear();
    approve.mockClear();
  });

  it("uses test_auto_connect Access log, never invite_auto_approve or request.approved", async () => {
    approve.mockResolvedValue({
      ok: true, request, membership, projectApiKey: "key",
    });
    await tryAutoApproveInviteRedeem({
      projectId: "proj-1", actorUserId: "bot-1", inviteId: "inv-abcdef12",
      inviteAutoApprove: false, teamLabel: null, scopes: [],
      suggestedName: "Buni", request,
      pendingResult: { ok: true, status: "pending" } as never,
    });
    expect(approve).toHaveBeenCalledWith(
      expect.objectContaining({ approvalSource: "test_auto_connect" }),
    );
    const source = approve.mock.calls[0]?.[0].approvalSource;
    expect(source).not.toBe("invite_auto_approve");
    expect(source).not.toBe("owner");
    expect(writer).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "member.auto_approved",
        actor: { kind: "system", userId: null },
        detail: expect.objectContaining({ approvalSource: "test_auto_connect" }),
      }),
    );
    expect(writer).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: "request.approved" }),
    );
  });
});
