import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import { formatAccessLogTime } from "@/features/projects/accessLog/formatAccessLogTime";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";

interface AwcAccessLogEventRowProps {
  readonly event: ProjectActivityLogEvent;
  readonly nowMs?: number;
}

/** One Access log row. Returns null for unknown event types (skip). */
export default function AwcAccessLogEventRow({
  event,
  nowMs,
}: AwcAccessLogEventRowProps) {
  const rendered = formatAccessLogEvent(event, nowMs);
  if (!rendered) return null;
  const time = formatAccessLogTime(event.at, nowMs);
  return (
    <li className="border-b border-gray-100 px-1 py-2.5 last:border-0 dark:border-gray-700/60">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-gray-800 dark:text-gray-100">{rendered.line}</p>
        <time
          dateTime={event.at}
          title={time.full}
          className="shrink-0 text-[12px] text-gray-500 dark:text-gray-400"
        >
          {time.relative}
        </time>
      </div>
      {rendered.detail ? (
        <p className="mt-0.5 text-[12px] text-gray-500 dark:text-gray-400">
          {rendered.detail}
        </p>
      ) : null}
    </li>
  );
}
