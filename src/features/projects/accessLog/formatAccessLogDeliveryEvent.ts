import {
  accessLogModeLabel,
  accessLogTargetName,
  capAccessLogLine,
  joinAccessLogDetails,
  type AccessLogRendered,
} from "@/features/projects/accessLog/accessLogEventHelpers";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/public-api/types";
import { formatProjectDeliveryModeActivity } from "@/lib/projects/acl/projectMembershipDeliveryModeActivity.constant";

/** member.delivery_mode_changed → locked mode.activity.* or autoWake. */
export const formatAccessLogDeliveryEvent = (
  event: ProjectActivityLogEvent,
): AccessLogRendered | null => {
  const d = event.detail;
  const mode = d.deliveryMode;
  if (!mode) return null;
  const name = accessLogTargetName(event);
  const prev = accessLogModeLabel(d.previousDeliveryMode);
  const modeWas = prev ? C.detailModeWas.replace("{mode}", prev) : null;
  if (d.trigger === "wake_link_saved" || event.actor.kind === "system") {
    return {
      line: capAccessLogLine(C.modeAutoWake.replace("{name}", name)),
      detail: joinAccessLogDetails(C.detailWakeLinkSaved, modeWas),
    };
  }
  const by =
    d.trigger === "member_switch" || event.actor.kind === "member"
      ? "member"
      : "owner";
  return {
    line: formatProjectDeliveryModeActivity({
      by,
      deliveryMode: mode,
      name: event.target?.displayName ?? null,
    }),
    detail: modeWas,
  };
};
