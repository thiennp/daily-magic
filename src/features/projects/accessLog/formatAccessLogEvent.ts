import {
  accessLogExpiresDetail,
  accessLogInviteDetail,
  accessLogKindDetail,
  accessLogTargetName,
  capAccessLogLine,
  joinAccessLogDetails,
  type AccessLogRendered,
} from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogDeliveryEvent } from "@/features/projects/accessLog/formatAccessLogDeliveryEvent";
import { formatAccessLogHumanInvite } from "@/features/projects/accessLog/formatAccessLogHumanInvite";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";
import { isProjectActivityEventType } from "@/lib/projects/acl/activity/projectActivityEvent.constant";

/** Map one API event to EN line + optional detail. Unknown types → null (skip). */
export const formatAccessLogEvent = (
  event: ProjectActivityLogEvent,
  nowMs: number = Date.now(),
): AccessLogRendered | null => {
  if (!isProjectActivityEventType(event.type)) return null;
  const d = event.detail;
  const name = accessLogTargetName(event);
  switch (event.type) {
    case "invite.created":
      return {
        line: C.inviteCreated,
        detail: joinAccessLogDetails(
          accessLogInviteDetail(d.label),
          accessLogExpiresDetail(d.expiresAt, nowMs),
        ),
      };
    case "invite.revoked":
      return { line: C.inviteRevoked, detail: accessLogInviteDetail(d.label) };
    case "invite.auto_approve_enabled":
      return { line: C.autoOn, detail: accessLogInviteDetail(d.label) };
    case "invite.auto_approve_disabled":
      return { line: C.autoOff, detail: accessLogInviteDetail(d.label) };
    case "member.auto_approved":
      return {
        line: capAccessLogLine(C.joinedAuto.replace("{name}", name)),
        detail: accessLogInviteDetail(d.label),
      };
    case "request.approved":
      return { line: C.requestApproved.replace("{name}", name), detail: null };
    case "request.denied": {
      const hasName = Boolean(event.target?.displayName?.trim());
      return {
        line: hasName
          ? C.requestDenied.replace("{name}", name)
          : C.requestDeniedNoName,
        detail: null,
      };
    }
    case "member.removed":
      return {
        line: C.memberRemoved.replace("{name}", name),
        detail: accessLogKindDetail(d.memberKind),
      };
    case "member.left":
      return {
        line: capAccessLogLine(C.memberLeft.replace("{name}", name)),
        detail: accessLogKindDetail(d.memberKind),
      };
    case "human_invite.created":
    case "human_invite.revoked":
    case "human_invite.accepted":
      return formatAccessLogHumanInvite(event, nowMs);
    case "member.delivery_mode_changed":
      return formatAccessLogDeliveryEvent(event);
    default:
      return null;
  }
};
