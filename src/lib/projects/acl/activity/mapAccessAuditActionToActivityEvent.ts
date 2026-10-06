import type { WriteProjectActivityEventInput } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type { WriteProjectAccessAuditInput } from "@/lib/projects/acl/writeProjectAccessAudit";

type Mapper = (
  input: WriteProjectAccessAuditInput,
  detail: Readonly<Record<string, unknown>>,
) => WriteProjectActivityEventInput | null;

const str = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

const inviteLabelOf = (detail: Readonly<Record<string, unknown>>) =>
  str(detail.label) ?? str(detail.inviteId)?.slice(0, 8) ?? null;

const owner = (input: WriteProjectAccessAuditInput) =>
  ({ kind: "owner", userId: input.actorUserId }) as const;

const memberTarget = (
  input: WriteProjectAccessAuditInput,
  detail: Readonly<Record<string, unknown>>,
) => ({
  membershipId: str(detail.membershipId),
  userId: input.targetUserId ?? null,
  label: input.targetLabel ?? null,
});

/** Only two modes, and S5 logs only on change: the previous mode is the other one. */
const otherMode = (mode: unknown): string | null =>
  mode === "poll" ? "webhook" : mode === "webhook" ? "poll" : null;

const MAPPERS: Partial<Record<WriteProjectAccessAuditInput["action"], Mapper>> = {
  approve: (input, detail) =>
    detail.approvalSource !== "owner"
      ? null
      : {
          projectId: input.projectId,
          type: "request.approved",
          actor: owner(input),
          target: {
            ...memberTarget(input, detail),
            label: input.targetLabel ?? str(detail.projectDisplayName),
          },
          detail: { requestId: detail.requestId, membershipId: detail.membershipId, approvalSource: "owner" },
        },
  deny: (input, detail) => ({
    projectId: input.projectId,
    type: "request.denied",
    actor: owner(input),
    target: { userId: input.targetUserId ?? null, label: input.targetLabel ?? null },
    detail: { requestId: detail.requestId },
  }),
  revoke: (input, detail) => ({
    projectId: input.projectId,
    type: "member.removed",
    actor: owner(input),
    target: memberTarget(input, detail),
    detail: { membershipId: detail.membershipId, memberKind: detail.memberKind },
  }),
  leave: (input, detail) => ({
    projectId: input.projectId,
    type: "member.left",
    actor: { kind: "member", userId: input.actorUserId },
    target: memberTarget(input, detail),
    detail: { membershipId: detail.membershipId, memberKind: detail.memberKind },
  }),
  "invite.create": (input, detail) => ({
    projectId: input.projectId,
    type: "invite.created",
    actor: owner(input),
    detail: { ...detail, label: inviteLabelOf(detail) },
  }),
  "invite.revoke": (input, detail) => ({
    projectId: input.projectId,
    type: "invite.revoked",
    actor: owner(input),
    detail: { inviteId: detail.inviteId, label: inviteLabelOf(detail) },
  }),
  "membership.delivery_mode": (input, detail) => ({
    projectId: input.projectId,
    type: "member.delivery_mode_changed",
    actor: {
      kind: detail.trigger === "wake_link_saved" ? "system" : undefined,
      userId: input.actorUserId,
    },
    target: memberTarget(input, detail),
    detail: {
      membershipId: detail.membershipId,
      deliveryMode: detail.deliveryMode,
      previousDeliveryMode: detail.previousDeliveryMode ?? otherMode(detail.deliveryMode),
      trigger: detail.trigger,
    },
  }),
};

/**
 * Pure: legacy audit action → Access log event, or null (not logged).
 * Null for msg.*, key.*, webhook.*, folder refs, claim/check, request,
 * invite.redeem, renames, and invite.auto_approve_* (073-linked path owns those).
 */
export const mapAccessAuditActionToActivityEvent = (
  input: WriteProjectAccessAuditInput,
): WriteProjectActivityEventInput | null =>
  MAPPERS[input.action]?.(input, input.detail ?? {}) ?? null;
