"use client";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import {
  AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS,
  AWC_PROJECT_ACCESS_BADGE_CLASS,
} from "@/features/projects/access/awcProjectAccessSection.constant";
import type { AwcMemberWakeLinkState } from "@/features/projects/access/utils/resolveMemberWakeLinkState";

/** Same emerald pill as "Auto-approved" (no new colours). */
const DONE_PILL_CLASS =
  "ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200";

/** Member row pill: "Waiting for wake link" (amber), "Wake link set", or "Checks on demand". */
export default function AwcProjectAccessMemberWakeLinkPill({
  state,
}: {
  readonly state: AwcMemberWakeLinkState;
}) {
  const copy = AWC_GROK_WAKE_AWAITING_COPY;
  if (state === "awaiting") {
    return (
      <span className={`ml-2 ${AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS}`}>
        {copy.pill}
      </span>
    );
  }
  if (state === "set") {
    return <span className={DONE_PILL_CLASS}>{copy.donePill}</span>;
  }
  if (state === "on_demand") {
    return (
      <span className={`ml-2 ${AWC_PROJECT_ACCESS_BADGE_CLASS}`}>
        {AWC_DELIVERY_MODE_COPY.optionPoll}
      </span>
    );
  }
  return null;
}
