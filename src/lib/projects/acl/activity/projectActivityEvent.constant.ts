/**
 * Access log (owner-only project_activity_events, migrations 092 + 095 + 097 + 098).
 * Access, wake, Safety-rule drop/restore, and Inbox Clear-all archive/restore
 * only: no msg.*, key.*, webhook.*, tool-call or claim/check rows. The DB CHECK
 * (098) must list exactly these types (union of every prior migration).
 */
export const PROJECT_ACTIVITY_EVENT_TYPES = [
  "invite.created",
  "invite.revoked",
  "invite.auto_approve_enabled",
  "invite.auto_approve_disabled",
  "member.auto_approved",
  "request.approved",
  "request.denied",
  "member.removed",
  "member.left",
  "human_invite.created",
  "human_invite.revoked",
  "human_invite.accepted",
  "member.delivery_mode_changed",
  // 095 (S0-2): owner toggles "Allow runs without approval" for project computers.
  "project.runs_without_approval_enabled",
  "project.runs_without_approval_disabled",
  "rule.dropped",
  "rule.restored",
  // 098: Inbox Clear all → archive / Restore (count-only Access log rows).
  "messages.archived",
  "messages.restored",
  // 133: owner changes what members can do (count-free Access log row).
  "project.member_permissions_changed",
] as const;

export type ProjectActivityEventType =
  (typeof PROJECT_ACTIVITY_EVENT_TYPES)[number];

export const PROJECT_ACTIVITY_ACTOR_KINDS = [
  "owner",
  "member",
  "system",
] as const;

export type ProjectActivityActorKind =
  (typeof PROJECT_ACTIVITY_ACTOR_KINDS)[number];

export const PROJECT_ACTIVITY_CATEGORIES = [
  "access",
  "wake",
  "safety",
] as const;

export type ProjectActivityCategory =
  (typeof PROJECT_ACTIVITY_CATEGORIES)[number];

export const PROJECT_ACTIVITY_WAKE_TYPES: readonly ProjectActivityEventType[] =
  ["member.delivery_mode_changed"];

export const PROJECT_ACTIVITY_SAFETY_TYPES: readonly ProjectActivityEventType[] =
  ["rule.dropped", "rule.restored"];

/**
 * How a join was approved. Only "owner" ever produces request.approved.
 * bot_invite (DF-038): same-owner bot redeemed a bot-made invite.
 */
export type ProjectApprovalSource =
  "owner" | "invite_auto_approve" | "test_auto_connect" | "bot_invite";

/** Write-time trim: newest N per project, nothing older than D days. */
export const PROJECT_ACTIVITY_RETENTION = {
  maxEvents: 500,
  maxAgeDays: 180,
} as const;

export const PROJECT_ACTIVITY_PAGE_LIMIT = {
  min: 1,
  max: 100,
  default: 50,
} as const;

export const PROJECT_ACTIVITY_LABEL_MAX_CHARS = 120;

export const isProjectActivityEventType = (
  value: unknown,
): value is ProjectActivityEventType =>
  typeof value === "string" &&
  (PROJECT_ACTIVITY_EVENT_TYPES as readonly string[]).includes(value);

export const projectActivityCategoryOf = (
  type: ProjectActivityEventType,
): ProjectActivityCategory => {
  if (PROJECT_ACTIVITY_WAKE_TYPES.includes(type)) return "wake";
  if (PROJECT_ACTIVITY_SAFETY_TYPES.includes(type)) return "safety";
  return "access";
};

export const projectActivityTypesForCategory = (
  category: ProjectActivityCategory,
): readonly ProjectActivityEventType[] =>
  PROJECT_ACTIVITY_EVENT_TYPES.filter(
    (type) => projectActivityCategoryOf(type) === category,
  );
