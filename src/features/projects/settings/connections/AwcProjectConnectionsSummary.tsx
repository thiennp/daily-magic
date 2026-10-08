import type { ProjectConnectionItem } from "@/features/projects/settings/connections/projectConnection.types";
import {
  formatProjectConnectionsCopy as fmt,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

/** "N of M connected · K need attention" pill with a meter (design). */
export default function AwcProjectConnectionsSummary({
  rows,
}: {
  readonly rows: readonly ProjectConnectionItem[];
}) {
  const connected = rows.filter((r) => r.status === "connected").length;
  const attention = rows.filter(
    (r) => r.status === "expired" || r.status === "error",
  ).length;
  const attentionText =
    attention === 0
      ? ""
      : attention === 1
        ? C.summaryAttentionOne
        : fmt(C.summaryAttention, { count: String(attention) });

  return (
    <p className="inline-flex w-fit items-center gap-2 rounded-awc-pill border border-awc-border bg-awc-surface px-3 py-1.5 text-[13px] font-semibold tabular-nums text-awc-fg-muted">
      <span aria-hidden="true" className="inline-flex gap-[3px]">
        {rows.map((r) => (
          <i
            key={r.provider}
            className={`size-2 rounded-[2px] ${
              r.status === "connected"
                ? "bg-awc-ok-dot"
                : r.status === "none"
                  ? "bg-awc-tile-2"
                  : "bg-awc-warn-dot"
            }`}
          />
        ))}
      </span>
      {fmt(C.summary, {
        count: String(connected),
        total: String(rows.length),
      })}
      {attentionText}
    </p>
  );
}
