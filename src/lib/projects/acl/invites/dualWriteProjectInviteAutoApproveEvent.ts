import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type { ProjectActivityEventType } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import type { ProjectInviteAutoApproveEventKind } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvent.types";
import { recordProjectInviteAutoApproveEvent } from "@/lib/projects/acl/invites/recordProjectInviteAutoApproveEvent";

const TYPE_BY_KIND: Readonly<
  Record<ProjectInviteAutoApproveEventKind, ProjectActivityEventType>
> = {
  enabled: "invite.auto_approve_enabled",
  disabled: "invite.auto_approve_disabled",
  member_auto_approved: "member.auto_approved",
};

/** Same link migration 092 uses, so backfill and live writes never duplicate. */
export const projectActivitySourceRefFor073 = (eventId: string): string =>
  `073:${eventId}`;

/**
 * Keep writing the 073 table (unchanged), then mirror the same row into the
 * Access log linked by source_ref. Auto joins are system events with
 * approvalSource=invite_auto_approve, never an owner approval.
 */
export const dualWriteProjectInviteAutoApproveEvent = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly event: ProjectInviteAutoApproveEventKind;
  readonly actorUserId?: string | null;
  readonly membershipId?: string | null;
  readonly memberDisplayName?: string | null;
  readonly memberUserId?: string | null;
}): Promise<void> => {
  const eventId = await recordProjectInviteAutoApproveEvent(input);
  const joined = input.event === "member_auto_approved";
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: TYPE_BY_KIND[input.event],
    actor: {
      kind: joined ? "system" : "owner",
      userId: input.actorUserId ?? null,
    },
    target: joined
      ? {
          membershipId: input.membershipId ?? null,
          userId: input.memberUserId ?? null,
          label: input.memberDisplayName ?? null,
        }
      : undefined,
    detail: {
      inviteId: input.inviteId,
      label: input.inviteId.slice(0, 8),
      ...(joined
        ? { membershipId: input.membershipId, approvalSource: "invite_auto_approve" }
        : {}),
    },
    sourceRef: projectActivitySourceRefFor073(eventId),
  });
};
