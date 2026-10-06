import { beforeEach, describe, expect, it, vi } from "vitest";

const record = vi.hoisted(() => vi.fn(async () => "e-1"));
const writer = vi.hoisted(() =>
  vi.fn<(event: unknown) => Promise<void>>(async () => undefined),
);

vi.mock("@/lib/projects/acl/invites/recordProjectInviteAutoApproveEvent", () => ({
  recordProjectInviteAutoApproveEvent: record,
}));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));

import { dualWriteProjectInviteAutoApproveEvent } from "@/lib/projects/acl/invites/dualWriteProjectInviteAutoApproveEvent";

describe("dualWriteProjectInviteAutoApproveEvent (073 + Access log)", () => {
  beforeEach(() => {
    record.mockClear();
    writer.mockClear();
  });

  it("keeps writing 073 and links the Access log row by source_ref", async () => {
    await dualWriteProjectInviteAutoApproveEvent({
      projectId: "proj-1",
      inviteId: "inv-12345678",
      event: "enabled",
      actorUserId: "owner-1",
    });
    expect(record).toHaveBeenCalledTimes(1);
    expect(writer).toHaveBeenCalledWith({
      projectId: "proj-1",
      type: "invite.auto_approve_enabled",
      actor: { kind: "owner", userId: "owner-1" },
      target: undefined,
      detail: { inviteId: "inv-12345678", label: "inv-1234" },
      sourceRef: "073:e-1",
    });
  });

  it("auto-approved join is a system event with approvalSource, never an owner approval", async () => {
    await dualWriteProjectInviteAutoApproveEvent({
      projectId: "proj-1",
      inviteId: "inv-12345678",
      event: "member_auto_approved",
      actorUserId: "owner-1",
      membershipId: "mem-1",
      memberDisplayName: "Soft Vale",
      memberUserId: "bot-1",
    });
    const event = writer.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(event.type).toBe("member.auto_approved");
    expect(event.actor).toEqual({ kind: "system", userId: "owner-1" });
    expect(event.target).toEqual({ membershipId: "mem-1", userId: "bot-1", label: "Soft Vale" });
    expect(event.detail).toMatchObject({ approvalSource: "invite_auto_approve", membershipId: "mem-1" });
    expect(event.sourceRef).toBe("073:e-1");
  });
});
