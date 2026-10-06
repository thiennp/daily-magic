import { beforeEach, describe, expect, it, vi } from "vitest";

const writer = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));

import { finalizeApprovedMembership } from "@/lib/projects/acl/finalizeApprovedMembership";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

const request = { id: "req-1", requesterUserId: "bot-1" } as ProjectAccessRequestRecord;
const membership = { id: "mem-1", userId: "bot-1", scopes: [] } as unknown as ProjectMembershipRecord;

const finalize = (
  approvalSource: "owner" | "invite_auto_approve" | "test_auto_connect",
) =>
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

  it("invite auto-approve and test_auto_connect joins log no request.approved", async () => {
    await finalize("invite_auto_approve");
    await finalize("test_auto_connect");
    expect(writer).not.toHaveBeenCalled();
  });
});
