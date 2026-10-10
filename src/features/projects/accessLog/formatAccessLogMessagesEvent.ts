import {
  capAccessLogLine,
  type AccessLogRendered,
} from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/public-api/types";

/** messages.archived / messages.restored → LOCK activity.* (owner reads "You"). */
export const formatAccessLogMessagesEvent = (
  event: ProjectActivityLogEvent,
): AccessLogRendered => {
  const copy = AWC_PROJECT_INBOX_COPY.activity;
  const name =
    event.actor.kind === "owner"
      ? C.actorYou
      : event.actor.displayName?.trim() || C.nameFallbackUnknown;
  const template =
    event.type === "messages.archived" ? copy.archived : copy.restored;
  const line = template
    .replace("{name}", name)
    .replace("{n}", String(event.detail.count ?? 0));
  return { line: capAccessLogLine(line), detail: null };
};
