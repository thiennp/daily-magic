"use client";

import {
  AWC_PROJECT_ACTIVITY_ACTIONS,
  AWC_PROJECT_ACTIVITY_ACTION_LABELS,
  type AwcProjectActivityAction,
} from "@/features/projects/access/awcProjectActivityActions.constant";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectActivity } from "@/features/projects/access/hooks/useAwcProjectActivity";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectActivityFeedProps {
  readonly projectId: string;
}

const memberAnchorId = (userId: string): string =>
  `access-member-${encodeURIComponent(userId)}`;

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const subjectUserId = (event: {
  readonly targetUserId: string | null;
  readonly actorUserId: string;
  readonly detail: Readonly<Record<string, string | boolean | null>>;
}): string | null => {
  if (event.targetUserId !== null && event.targetUserId.length > 0) {
    return event.targetUserId;
  }
  const fromDetail = event.detail.subjectUserId;
  if (typeof fromDetail === "string" && fromDetail.length > 0) {
    return fromDetail;
  }
  return null;
};

export default function AwcProjectActivityFeed({
  projectId,
}: AwcProjectActivityFeedProps) {
  const activity = useAwcProjectActivity(projectId);
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
          {activity.message ?? copy.activityUnavailable}
        </p>
      ) : null}

      {!activity.isLoading &&
      !activity.unavailable &&
      activity.events.length === 0 ? (
        <p className="text-sm text-gray-500">{copy.activityEmpty}</p>
      ) : null}

      {activity.events.length > 0 ? (
        <ul className="space-y-2">
          {activity.events.map((event) => {
            const subject = subjectUserId(event);
            const label =
              AWC_PROJECT_ACTIVITY_ACTION_LABELS[event.action] ?? event.action;
            return (
              <li
                key={event.id}
                className="rounded-lg border border-gray-200/80 px-3 py-2 text-sm dark:border-gray-800/80"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {label}
                  </span>
                  <time
                    className="text-xs text-gray-500 dark:text-gray-400"
                    dateTime={event.at}
                  >
                    {formatWhen(event.at)}
                  </time>
                </div>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Actor {event.actorUserId}
                  {subject !== null ? (
                    <>
                      {" · "}
                      <a
                        href={`#${memberAnchorId(subject)}`}
                        className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white"
                      >
                        Member {subject}
                      </a>
                    </>
                  ) : null}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {copy.activityNonGoals}
      </p>
    </div>
  );
}
