import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import {
  accessLogExpiresDetail,
  accessLogRoleLabel,
  accessLogTargetName,
  capAccessLogLine,
  type AccessLogRendered,
} from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";

export const formatAccessLogHumanInvite = (
  event: ProjectActivityLogEvent,
  nowMs: number,
): AccessLogRendered => {
  const d = event.detail;
  const role = accessLogRoleLabel(d.role);
  if (event.type === "human_invite.created") {
    return {
      line: role
        ? C.humanInviteCreated.replace("{roleLabel}", role)
        : C.humanInviteCreatedNoRole,
      detail: accessLogExpiresDetail(d.expiresAt, nowMs),
    };
  }
  if (event.type === "human_invite.revoked") {
    return {
      line: role
        ? C.humanInviteRevoked.replace("{roleLabel}", role)
        : C.humanInviteRevokedNoRole,
      detail: null,
    };
  }
  const acceptedRole = role ?? HUMAN_INVITE_UI_COPY.roleMember;
  return {
    line: capAccessLogLine(
      C.humanInviteAccepted
        .replace("{name}", accessLogTargetName(event))
        .replace("{roleLabel}", acceptedRole),
    ),
    detail: null,
  };
};
