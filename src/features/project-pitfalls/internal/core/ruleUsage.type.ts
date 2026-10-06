import type { ProjectPitfallSource } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

export type RuleCompareOverlapReason = "duplicate" | "overlap";

export interface RuleUsageRow {
  readonly ruleId: string;
  readonly title: string;
  readonly source: ProjectPitfallSource;
  readonly active: boolean;
  readonly hitCount: number;
  readonly lastHitAt: string | null;
}

export interface RuleCompareOverlap {
  readonly ruleIdA: string;
  readonly ruleIdB: string;
  readonly reason: RuleCompareOverlapReason;
  readonly score: number;
}

export interface ProjectRuleUsageResult {
  readonly ok: true;
  readonly projectId: string;
  /** null = hitCount is all-time (no per-hit event log to window). */
  readonly windowDays: null;
  readonly rules: readonly RuleUsageRow[];
  readonly overlaps: readonly RuleCompareOverlap[];
}
