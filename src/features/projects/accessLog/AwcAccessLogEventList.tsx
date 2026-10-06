"use client";

import AwcAccessLogEmpty from "@/features/projects/accessLog/AwcAccessLogEmpty";
import AwcAccessLogEventRow from "@/features/projects/accessLog/AwcAccessLogEventRow";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { useAwcAccessLog } from "@/features/projects/accessLog/hooks/useAwcAccessLog";
import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";

type Log = ReturnType<typeof useAwcAccessLog>;

interface AwcAccessLogEventListProps {
  readonly log: Log;
}

export default function AwcAccessLogEventList({ log }: AwcAccessLogEventListProps) {
  const visible = log.events.filter((e) => formatAccessLogEvent(e) !== null);
  const filtered = log.category !== "all";
  const retentionLine =
    log.retention != null
      ? C.retention
          .replace("{maxEvents}", String(log.retention.maxEvents))
          .replace("{maxAgeDays}", String(log.retention.maxAgeDays))
      : null;

  if (log.isLoading) {
    return <p className="py-6 text-center text-sm text-gray-500">{C.loading}</p>;
  }
  if (log.ownerOnly) {
    return (
      <p className="py-6 text-center text-sm text-gray-600 dark:text-gray-300">
        {C.ownerOnly}
      </p>
    );
  }
  if (log.error) {
    return (
      <div className="py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">{C.error}</p>
        <button
          type="button"
          className="mt-2 text-sm font-medium text-gray-900 underline dark:text-white"
          onClick={log.reload}
        >
          {C.retry}
        </button>
      </div>
    );
  }
  if (visible.length === 0) {
    return <AwcAccessLogEmpty filtered={filtered} retention={log.retention} />;
  }
  return (
    <div>
      <ul className="max-h-[50vh] overflow-y-auto">
        {log.events.map((event) => (
          <AwcAccessLogEventRow key={event.id} event={event} />
        ))}
      </ul>
      {retentionLine ? (
        <p className="mt-3 text-[12px] text-gray-500 dark:text-gray-400">
          {retentionLine}
        </p>
      ) : null}
      {log.nextCursor ? (
        <div className="mt-3 text-center">
          <button
            type="button"
            className="text-sm font-medium text-gray-900 underline disabled:opacity-50 dark:text-white"
            disabled={log.isLoadingMore}
            onClick={log.loadMore}
          >
            {log.isLoadingMore ? C.loadingMore : C.loadMore}
          </button>
          {log.errorMore ? (
            <p className="mt-1 text-[12px] text-amber-700 dark:text-amber-300">
              {C.errorMore}{" "}
              <button type="button" className="underline" onClick={log.loadMore}>
                {C.retry}
              </button>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-3 text-center text-[12px] text-gray-500">{C.end}</p>
      )}
    </div>
  );
}
