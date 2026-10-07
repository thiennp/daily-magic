import {
  PROJECT_ACTIVITY_DETAIL_BOOLEAN_KEYS,
  PROJECT_ACTIVITY_DETAIL_MAX_STRING_CHARS,
  PROJECT_ACTIVITY_DETAIL_NUMBER_KEYS,
  PROJECT_ACTIVITY_DETAIL_STRING_KEYS,
  PROJECT_ACTIVITY_TEAM_LABEL_MAX_CHARS,
} from "@/lib/projects/acl/activity/projectActivityDetail.constant";
import { PROJECT_ACTIVITY_LABEL_MAX_CHARS } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import type { ProjectActivityEventDetail } from "@/lib/projects/acl/activity/types/ProjectActivityLog.type";

const ENUM_VALUES: Readonly<Record<string, readonly string[]>> = {
  memberKind: ["bot", "human", "computer"],
  role: ["member", "viewer"],
  deliveryMode: ["webhook", "poll"],
  previousDeliveryMode: ["webhook", "poll"],
  trigger: ["owner_switch", "member_switch", "wake_link_saved"],
  approvalSource: [
    "owner",
    "invite_auto_approve",
    "test_auto_connect",
    "bot_invite",
  ],
};

/** Anything that looks like an email never lands in the Access log. */
const looksLikeEmail = (value: string): boolean => value.includes("@");

const cleanString = (key: string, value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const max =
    key === "teamLabel"
      ? PROJECT_ACTIVITY_TEAM_LABEL_MAX_CHARS
      : PROJECT_ACTIVITY_DETAIL_MAX_STRING_CHARS;
  const trimmed = value.trim().slice(0, max);
  if (trimmed.length === 0 || looksLikeEmail(trimmed)) return null;
  const allowed = ENUM_VALUES[key];
  return allowed === undefined || allowed.includes(trimmed) ? trimmed : null;
};

/** Keep only the allowlisted keys, on write and again on read. */
export const sanitizeProjectActivityEventDetail = (
  detail: Readonly<Record<string, unknown>> | null | undefined,
): ProjectActivityEventDetail => {
  if (detail === null || detail === undefined || typeof detail !== "object") {
    return {};
  }
  const out: Record<string, string | number | boolean> = {};
  PROJECT_ACTIVITY_DETAIL_STRING_KEYS.forEach((key) => {
    const value = cleanString(key, detail[key]);
    if (value !== null) out[key] = value;
  });
  PROJECT_ACTIVITY_DETAIL_BOOLEAN_KEYS.forEach((key) => {
    if (typeof detail[key] === "boolean") out[key] = detail[key] as boolean;
  });
  PROJECT_ACTIVITY_DETAIL_NUMBER_KEYS.forEach((key) => {
    const value = detail[key];
    if (typeof value === "number" && Number.isFinite(value)) out[key] = value;
  });
  return out as ProjectActivityEventDetail;
};

/** Display-name snapshot: trimmed, capped, never an email. */
export const sanitizeProjectActivityLabel = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, PROJECT_ACTIVITY_LABEL_MAX_CHARS);
  return trimmed.length === 0 || looksLikeEmail(trimmed) ? null : trimmed;
};
