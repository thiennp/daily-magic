export const PROJECT_INVITE_AUTO_APPROVE_EVENTS = [
  "enabled",
  "disabled",
  "member_auto_approved",
] as const;

export type ProjectInviteAutoApproveEventKind =
  (typeof PROJECT_INVITE_AUTO_APPROVE_EVENTS)[number];

export type ProjectInviteAutoApproveEvent = {
  readonly id: string;
  readonly projectId: string;
  readonly inviteId: string;
  readonly inviteLabel: string;
  readonly event: ProjectInviteAutoApproveEventKind;
  readonly actorUserId: string | null;
  readonly membershipId: string | null;
  readonly memberDisplayName: string | null;
  readonly createdAt: string;
};
