import type { ProjectHistorySkillgenState } from "./projectHistorySkillgenStateMachine";

export type ProjectHistorySkillgenMetricsEvent = {
  readonly at: string;
  readonly projectId: string;
  readonly episodeId: string;
  readonly fromState: ProjectHistorySkillgenState;
  readonly toState: ProjectHistorySkillgenState;
  readonly reason: string | null;
  readonly tokensUsed: number;
  readonly openDraftCount: number;
};

export type RecordProjectHistorySkillgenMetricsInput = {
  readonly projectId: string;
  readonly episodeId: string;
  readonly fromState: ProjectHistorySkillgenState;
  readonly toState: ProjectHistorySkillgenState;
  readonly reason?: string | null;
  readonly tokensUsed?: number;
  readonly openDraftCount?: number;
  readonly nowIso?: string;
};

/**
 * Step 16 — counts and costs only; never message bodies.
 * Pure builder; the IO runner appends the JSON line to skillgen/metrics.jsonl.
 */
export const recordProjectHistorySkillgenMetrics = (
  input: RecordProjectHistorySkillgenMetricsInput,
): ProjectHistorySkillgenMetricsEvent => ({
  at: input.nowIso ?? new Date().toISOString(),
  projectId: input.projectId,
  episodeId: input.episodeId,
  fromState: input.fromState,
  toState: input.toState,
  reason: input.reason ?? null,
  tokensUsed: Math.max(0, input.tokensUsed ?? 0),
  openDraftCount: Math.max(0, input.openDraftCount ?? 0),
});
