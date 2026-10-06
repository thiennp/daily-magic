import {
  isProjectActivityEventType,
  projectActivityCategoryOf,
  type ProjectActivityActorKind,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import {
  sanitizeProjectActivityEventDetail,
  sanitizeProjectActivityLabel,
} from "@/lib/projects/acl/activity/sanitizeProjectActivityEventDetail";
import type {
  ProjectActivityEventDetail,
  ProjectActivityLogEvent,
} from "@/lib/projects/acl/activity/types/ProjectActivityLog.type";

const str = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

const readDetail = (value: unknown): Readonly<Record<string, unknown>> => {
  if (typeof value === "string") {
    try {
      return readDetail(JSON.parse(value));
    } catch {
      return {};
    }
  }
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Readonly<Record<string, unknown>>)
    : {};
};

export const readProjectActivityAt = (value: unknown): string =>
  value instanceof Date
    ? value.toISOString()
    : new Date(String(value ?? 0)).toISOString();

const TRIGGER_BY_KIND = {
  owner: "owner_switch",
  member: "member_switch",
  system: "wake_link_saved",
} as const;

const KINDS: readonly ProjectActivityActorKind[] = ["owner", "member", "system"];

/** DB row → owner DTO. Unknown types/kinds are dropped (forward compatibility). */
export const mapProjectActivityEventRow = (
  row: Record<string, unknown>,
): ProjectActivityLogEvent | null => {
  const id = str(row.id);
  const type = row.event_type;
  const kind = KINDS.find((k) => k === row.actor_kind);
  if (id === null || !isProjectActivityEventType(type) || kind === undefined) {
    return null;
  }
  const sanitized = sanitizeProjectActivityEventDetail(readDetail(row.detail));
  const detail: ProjectActivityEventDetail =
    type === "member.delivery_mode_changed" && sanitized.trigger === undefined
      ? { ...sanitized, trigger: TRIGGER_BY_KIND[kind] }
      : sanitized;
  const targetMembershipId = str(row.target_membership_id);
  const targetUserId = str(row.target_user_id);
  const targetName =
    sanitizeProjectActivityLabel(row.target_label) ??
    sanitizeProjectActivityLabel(row.target_live_label);
  const hasTarget =
    targetMembershipId !== null || targetUserId !== null || targetName !== null;
  return {
    id,
    type,
    category: projectActivityCategoryOf(type),
    at: readProjectActivityAt(row.created_at),
    actor: {
      kind,
      userId: str(row.actor_user_id),
      displayName:
        kind !== "member"
          ? null
          : (sanitizeProjectActivityLabel(row.actor_label) ??
            sanitizeProjectActivityLabel(row.actor_live_label)),
    },
    target: hasTarget
      ? { membershipId: targetMembershipId, userId: targetUserId, displayName: targetName }
      : null,
    detail,
  };
};
