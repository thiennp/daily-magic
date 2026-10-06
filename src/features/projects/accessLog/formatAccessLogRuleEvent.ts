import type { AccessLogRendered } from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";

/** rule.dropped / rule.restored → owner Safety rule line; title from detail.label. */
export const formatAccessLogRuleEvent = (
  event: ProjectActivityLogEvent,
): AccessLogRendered => {
  const title = event.detail.label?.trim() ?? "";
  const dropped = event.type === "rule.dropped";
  if (title.length === 0) {
    return {
      line: dropped ? C.ruleDroppedNoTitle : C.ruleRestoredNoTitle,
      detail: null,
    };
  }
  const template = dropped ? C.ruleDropped : C.ruleRestored;
  return { line: template.replace("{title}", title), detail: null };
};
