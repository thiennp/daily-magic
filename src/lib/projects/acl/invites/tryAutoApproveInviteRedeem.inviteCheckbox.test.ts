import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: vi.fn(),
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

import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { tryAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/tryAutoApproveInviteRedeem";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const approve = vi.mocked(approveProjectAccessRequest);

const request = { id: "req-1", requesterUserId: "bot-1" } as ProjectAccessRequestRecord;
const membership = {
  id: "mem-1", userId: "bot-1", scopes: [], projectDisplayName: "Buni",
} as unknown as ProjectMembershipRecord;

describe("tryAutoApproveInviteRedeem invite checkbox", () => {
  beforeEach(() => approve.mockClear());

  it("keeps approvalSource invite_auto_approve", async () => {
    approve.mockResolvedValue({
      ok: true, request, membership, projectApiKey: "key",
    });
    await tryAutoApproveInviteRedeem({
      projectId: "proj-1", actorUserId: "bot-1", inviteId: "inv-1",
      inviteAutoApprove: true, teamLabel: null, scopes: [],
      suggestedName: "Buni", request,
      pendingResult: { ok: true, status: "pending" } as never,
    });
    expect(approve).toHaveBeenCalledWith(
      expect.objectContaining({
        approvalSource: "invite_auto_approve", ownerUserId: "owner-1",
      }),
    );
  });
});
