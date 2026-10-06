import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";

import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

export interface AwcProjectPitfallRow {
  readonly id: string;
  readonly title: string;
  /** Situation to avoid (cause). */
  readonly situation: string;
  readonly fix: string;
  readonly triggers: readonly string[];
  readonly severityLabel: string;
  readonly severity: ProjectPitfallView["severity"];
  readonly sourceLabel: string;
  readonly lastHitLabel: string;
  readonly updatedLabel: string;
  readonly hitCount: number;
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

export const formatAwcPitfallUpdatedAt = (updatedAt: string | null): string => {
  if (updatedAt === null) {
    return AWC_PROJECT_PITFALLS_COPY.notUpdatedYet;
  }
  const at = Date.parse(updatedAt);
  if (Number.isNaN(at)) {
    return AWC_PROJECT_PITFALLS_COPY.notUpdatedYet;
  }
  return AWC_PROJECT_PITFALLS_COPY.updated(
    new Date(at).toISOString().slice(0, 10),
  );
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
        situation: item.cause,
        fix: item.avoidance,
        triggers: item.keywords,
        severity: item.severity,
        severityLabel: AWC_PROJECT_PITFALLS_COPY.severity[item.severity],
        sourceLabel: AWC_PROJECT_PITFALLS_COPY.source[item.source],
        lastHitLabel:
          relative === null
            ? AWC_PROJECT_PITFALLS_COPY.neverHit
            : AWC_PROJECT_PITFALLS_COPY.lastHit(relative),
        updatedLabel: formatAwcPitfallUpdatedAt(item.updatedAt),
        hitCount: item.hitCount,
      };
    });

export default buildAwcProjectPitfallRows;
