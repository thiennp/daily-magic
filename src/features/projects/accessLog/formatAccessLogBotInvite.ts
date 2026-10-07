import {
  accessLogExpiresDetail,
  accessLogInviteDetail,
  accessLogTargetName,
  capAccessLogLine,
  joinAccessLogDetails,
  type AccessLogRendered,
} from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";

/** DF-038: the inviting bot is the actor; its nickname is the "Invited by". */
const inviterName = (event: ProjectActivityLogEvent): string => {
  const raw = event.actor.displayName?.trim() ?? "";
  return raw.length > 0 ? raw : C.nameFallbackAssistant;
};

/**
 * Bot-made invite rows (detail.approvalSource = bot_invite): create →
 * invite.created, redeem → member.auto_approved. Other types → null (skip).
 */
export const formatAccessLogBotInvite = (
  event: ProjectActivityLogEvent,
  nowMs: number,
): AccessLogRendered | null => {
  const bot = inviterName(event);
  const d = event.detail;
  if (event.type === "invite.created") {
    return {
      line: capAccessLogLine(C.botInviteCreated.replace("{bot}", bot)),
      detail: joinAccessLogDetails(
        accessLogInviteDetail(d.label),
        accessLogExpiresDetail(d.expiresAt, nowMs),
      ),
    };
  }
  if (event.type === "member.auto_approved") {
    return {
      line: capAccessLogLine(
        C.botInviteJoined
          .replace("{name}", accessLogTargetName(event, "bot"))
          .replace("{bot}", bot),
      ),
      detail: accessLogInviteDetail(d.label),
    };
  }
  return null;
};
