"use client";

import {
  AWC_PROJECT_ACTIVITY_ACTIONS,
  AWC_PROJECT_ACTIVITY_ACTION_LABELS,
  type AwcProjectActivityAction,
} from "@/features/projects/access/awcProjectActivityActions.constant";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import AwcProjectActivityFeedList from "@/features/projects/access/AwcProjectActivityFeedList";
import { useAwcProjectActivity } from "@/features/projects/access/hooks/useAwcProjectActivity";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

interface AwcProjectActivityFeedProps {
  readonly projectId: string;
  /** Bump after membership mutations so the feed refetches audit events. */
  readonly refreshSignal?: number;
}

export default function AwcProjectActivityFeed({
  projectId,
  refreshSignal = 0,
}: AwcProjectActivityFeedProps) {
  const activity = useAwcProjectActivity(projectId, refreshSignal);
  const copy = AWC_PROJECT_ACCESS_COPY;

  const onFilterChange = (value: string) => {
    if (value === "all") {
      activity.setFilter("all");
      return;
    }
    activity.setFilter(value as AwcProjectActivityAction);
  };

  return (
    <div className="space-y-3" id="project-activity">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            {copy.activityHeading}
          </h3>
          <p className={`mt-1 text-xs ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            {copy.activityHonesty}
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span>{copy.activityFilterLabel}</span>
          <select
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950"
            value={activity.filter}
            onChange={(event) => onFilterChange(event.target.value)}
          >
            <option value="all">{copy.activityFilterAll}</option>
            {AWC_PROJECT_ACTIVITY_ACTIONS.map((action) => (
              <option key={action} value={action}>
                {AWC_PROJECT_ACTIVITY_ACTION_LABELS[action]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {activity.isLoading ? (
        <p className="text-xs text-gray-400">{copy.activityLoading}</p>
      ) : null}

      {activity.unavailable ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {activity.message
            ? mapProjectAccessError(activity.message, activity.message)
            : copy.activityUnavailable}
        </p>
      ) : null}

      {!activity.isLoading &&
      !activity.unavailable &&
      activity.events.length === 0 ? (
        <p className="text-sm text-gray-500">{copy.activityEmpty}</p>
      ) : null}

      <AwcProjectActivityFeedList events={activity.events} />

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {copy.activityNonGoals}
      </p>
    </div>
  );
}
