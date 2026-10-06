import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogDate } from "@/features/projects/accessLog/formatAccessLogTime";
import type {
  ProjectActivityLogEvent,
  ProjectActivityMemberKind,
} from "@/features/projects/activityLog/projectAccessLog.type";

export type AccessLogRendered = {
  readonly line: string;
  readonly detail: string | null;
};

export const capAccessLogLine = (s: string): string =>
  s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);

export const joinAccessLogDetails = (
  ...parts: Array<string | null | undefined>
): string | null => {
  const ok = parts.filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
  return ok.length > 0 ? ok.join(" · ") : null;
};

const fallbackName = (kind: ProjectActivityMemberKind | undefined): string => {
  if (kind === "bot") return C.nameFallbackAssistant;
  if (kind === "human") return C.nameFallbackPerson;
  if (kind === "computer") return C.nameFallbackComputer;
  return C.nameFallbackUnknown;
};

export const accessLogTargetName = (
  event: ProjectActivityLogEvent,
  kind?: ProjectActivityMemberKind,
): string => {
  const raw = event.target?.displayName?.trim() ?? "";
  return raw.length > 0 ? raw : fallbackName(kind ?? event.detail.memberKind);
};

export const accessLogRoleLabel = (role: string | undefined): string | null => {
  if (role === "member") return HUMAN_INVITE_UI_COPY.roleMember;
  if (role === "viewer") return HUMAN_INVITE_UI_COPY.roleViewer;
  return null;
};

export const accessLogModeLabel = (
  mode: "webhook" | "poll" | undefined,
): string | null => {
  if (mode === "poll") return AWC_DELIVERY_MODE_COPY.optionPoll;
  if (mode === "webhook") return AWC_DELIVERY_MODE_COPY.optionWebhook;
  return null;
};

export const accessLogKindDetail = (
  kind: ProjectActivityMemberKind | undefined,
): string | null => {
  if (kind === "bot") return C.detailKindBot;
  if (kind === "human") return C.detailKindHuman;
  if (kind === "computer") return C.detailKindComputer;
  return null;
};

export const accessLogInviteDetail = (
  label: string | undefined,
): string | null =>
  label ? C.detailInvite.replace("{inviteLabel}", label) : null;

export const accessLogExpiresDetail = (
  expiresAt: string | undefined,
  nowMs: number,
): string | null =>
  expiresAt
    ? C.detailExpires.replace("{date}", formatAccessLogDate(expiresAt, nowMs))
    : null;
