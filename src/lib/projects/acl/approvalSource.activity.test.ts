import { beforeEach, describe, expect, it, vi } from "vitest";

const writer = vi.hoisted(() => vi.fn(async () => undefined));
const approve = vi.hoisted(() => vi.fn(async () => ({ ok: false, code: "not_pending" })));

vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: approve,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ id: "proj-1", ownerUserId: "owner-1" })),
}));

import { finalizeApprovedMembership } from "@/lib/projects/acl/finalizeApprovedMembership";
import { tryAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/tryAutoApproveInviteRedeem";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const request = { id: "req-1", requesterUserId: "bot-1" } as ProjectAccessRequestRecord;
const membership = { id: "mem-1", userId: "bot-1", scopes: [] } as unknown as ProjectMembershipRecord;

const finalize = (approvalSource: "owner" | "invite_auto_approve" | "test_flag") =>
  finalizeApprovedMembership({
    projectId: "proj-1",
    ownerUserId: "owner-1",
    request,
    membership,
    displayName: "Buni",
    mintKey: false,
    approvalSource,
  });

describe("approvalSource: only owner clicks read as request.approved", () => {
  beforeEach(() => {
    writer.mockClear();
    approve.mockClear();
  });

  it("owner approval logs request.approved with approvalSource=owner", async () => {
    await finalize("owner");
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer).toHaveBeenCalledWith(expect.objectContaining({
      type: "request.approved",
      actor: { kind: "owner", userId: "owner-1" },
      detail: expect.objectContaining({ approvalSource: "owner" }),
    }));
  });

  it("invite auto-approve and test-flag joins log no request.approved", async () => {
    await finalize("invite_auto_approve");
    await finalize("test_flag");
    expect(writer).not.toHaveBeenCalled();
  });

  it("tryAutoApproveInviteRedeem approves with approvalSource=invite_auto_approve", async () => {
    const pendingResult = { ok: true, status: "pending" } as never;
    await tryAutoApproveInviteRedeem({
      projectId: "proj-1",
      actorUserId: "bot-1",
      inviteId: "inv-1",
      inviteAutoApprove: true,
      teamLabel: null,
      scopes: [],
      suggestedName: "Buni",
      request,
      pendingResult,
    });
    expect(approve).toHaveBeenCalledWith(
      expect.objectContaining({ approvalSource: "invite_auto_approve", ownerUserId: "owner-1" }),
    );
  });
});
