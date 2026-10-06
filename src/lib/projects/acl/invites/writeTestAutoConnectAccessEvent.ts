import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";

/** Access log for flag-only invite redeem (no 073 dual-write, never owner Approve). */
export const writeTestAutoConnectAccessEvent = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly membershipId: string;
  readonly memberUserId: string;
  readonly memberDisplayName: string;
}): Promise<void> => {
  const label = input.inviteId.slice(0, 8);
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: "member.auto_approved",
    actor: { kind: "system", userId: null },
    target: {
      membershipId: input.membershipId,
      userId: input.memberUserId,
      label: input.memberDisplayName,
    },
    detail: {
      inviteId: input.inviteId,
      label,
      membershipId: input.membershipId,
      approvalSource: "test_auto_connect",
    },
  });
};
