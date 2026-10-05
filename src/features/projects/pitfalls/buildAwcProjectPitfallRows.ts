import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type { ProjectPitfallView } from "@/lib/projects/pitfalls/ProjectPitfall.type";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

export interface AwcProjectPitfallRow {
  readonly id: string;
  readonly title: string;
  readonly fix: string;
  readonly triggers: readonly string[];
  readonly severityLabel: string;
  readonly severity: ProjectPitfallView["severity"];
  readonly sourceLabel: string;
  readonly lastHitLabel: string;
}

const SEVERITY_RANK: Readonly<Record<ProjectPitfallView["severity"], number>> =
  {
    block: 0,
    warn: 1,
    info: 2,
  };

const lastSeenMs = (value: string | null): number => {
  const ms = value === null ? Number.NaN : Date.parse(value);
  return Number.isNaN(ms) ? 0 : ms;
};

/**
 * Read-only AWC rows: active pitfalls only (retired hidden), most serious
 * first, then most recently hit.
 */
const buildAwcProjectPitfallRows = (
  items: readonly ProjectPitfallView[],
  nowMs: number = Date.now(),
): readonly AwcProjectPitfallRow[] =>
  [...items]
    .filter((item) => item.source !== "retired")
    .sort(
      (a, b) =>
        SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
        lastSeenMs(b.lastSeenAt) - lastSeenMs(a.lastSeenAt) ||
        a.symptom.localeCompare(b.symptom),
    )
    .map((item) => {
      const relative = formatRelativeTimeAgo(item.lastSeenAt, nowMs);
      return {
        id: item.id,
        title: item.symptom,
        fix: item.avoidance,
        triggers: item.keywords,
        severity: item.severity,
        severityLabel: AWC_PROJECT_PITFALLS_COPY.severity[item.severity],
        sourceLabel: AWC_PROJECT_PITFALLS_COPY.source[item.source],
        lastHitLabel:
          relative === null
            ? AWC_PROJECT_PITFALLS_COPY.neverHit
            : AWC_PROJECT_PITFALLS_COPY.lastHit(relative),
      };
    });

export default buildAwcProjectPitfallRows;
