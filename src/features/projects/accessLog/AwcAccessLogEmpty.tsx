import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { ProjectActivityLogRetention } from "@/features/projects/activityLog/public-api/types";

interface AwcAccessLogEmptyProps {
  readonly filtered: boolean;
  readonly retention: ProjectActivityLogRetention | null;
}

export default function AwcAccessLogEmpty({
  filtered,
  retention,
}: AwcAccessLogEmptyProps) {
  const retentionLine =
    retention != null
      ? C.retention
          .replace("{maxEvents}", String(retention.maxEvents))
          .replace("{maxAgeDays}", String(retention.maxAgeDays))
      : null;
  return (
    <div className="px-1 py-6 text-center">
      <p className="text-sm text-awc-fg-muted dark:text-gray-300">
        {filtered ? C.emptyFiltered : C.empty}
      </p>
      {retentionLine ? (
        <p className="mt-2 text-[12px] text-awc-fg-muted dark:text-gray-400">
          {retentionLine}
        </p>
      ) : null}
    </div>
  );
}
