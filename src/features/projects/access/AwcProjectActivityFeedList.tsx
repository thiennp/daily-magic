import { AWC_PROJECT_ACTIVITY_ACTION_LABELS } from "@/features/projects/access/awcProjectActivityActions.constant";
import type AwcProjectActivityEvent from "@/features/projects/access/types/awcProjectActivityEvent.type";
import {
  awcProjectActivityMemberAnchorId,
  formatAwcProjectActivityWhen,
  humanizeAwcProjectActivityDetailValue,
  resolveAwcProjectActivitySubjectUserId,
} from "@/features/projects/access/utils/awcProjectActivityDisplay.util";

interface AwcProjectActivityFeedListProps {
  readonly events: readonly AwcProjectActivityEvent[];
}

export default function AwcProjectActivityFeedList({
  events,
}: AwcProjectActivityFeedListProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {events.map((event) => {
        const subject = resolveAwcProjectActivitySubjectUserId(event);
        const label =
          AWC_PROJECT_ACTIVITY_ACTION_LABELS[event.action] ??
          humanizeAwcProjectActivityDetailValue(event.action);
        const outcome =
          typeof event.detail.outcome === "string"
            ? humanizeAwcProjectActivityDetailValue(event.detail.outcome)
            : null;
        const status =
          typeof event.detail.status === "string"
            ? humanizeAwcProjectActivityDetailValue(event.detail.status)
            : null;
        const nickname =
          typeof event.detail.projectDisplayName === "string"
            ? event.detail.projectDisplayName
            : null;
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
                {formatAwcProjectActivityWhen(event.at)}
              </time>
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Actor {event.actorUserId}
              {subject !== null ? (
                <>
                  {" · "}
                  <a
                    href={`#${awcProjectActivityMemberAnchorId(subject)}`}
                    className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white"
                  >
                    Member {subject}
                  </a>
                </>
              ) : null}
              {nickname ? <> · Nickname {nickname}</> : null}
              {outcome ? <> · {outcome}</> : null}
              {status && status !== outcome ? <> · {status}</> : null}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
