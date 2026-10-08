import type { AutoSkillCluster, AutoSkillVerdict } from "./autoSkill.types";

export type AutoSkillDecision =
  | {
      readonly action: "none";
      readonly reason: "first" | "never" | "saved" | "already_pending";
    }
  | {
      readonly action: "ask";
      readonly clusterId: string;
      /** Times this kind of task has run, including the new run. */
      readonly occurrences: number;
      readonly matchedRunIds: readonly string[];
      readonly reasons: readonly string[];
    };

export type DecideAutoSkillRepeatInput = {
  readonly newRunId: string;
  readonly verdicts: readonly AutoSkillVerdict[];
  /** runId -> clusterId for runs already assigned to a cluster. */
  readonly runClusterIds: Readonly<Record<string, string>>;
  readonly clusters: Readonly<Record<string, AutoSkillCluster>>;
};

const isRepeat = (v: AutoSkillVerdict): boolean =>
  v.verdict === "SAME" || v.verdict === "SIMILAR";

const fallbackClusterId = (firstRunId: string): string =>
  `task-${firstRunId.slice(0, 8)}`;

/**
 * Repetition rule: never ask for the 1st occurrence; from the 2nd on raise a
 * question unless the cluster is "never", already saved, or already asked and
 * still waiting. SAME and SIMILAR both count. A "never" match wins over all.
 */
export const decideAutoSkillRepeat = (
  input: DecideAutoSkillRepeatInput,
): AutoSkillDecision => {
  const matches = input.verdicts.filter(isRepeat);
  if (matches.length === 0) {
    return { action: "none", reason: "first" };
  }
  const matchedRunIds = [...new Set(matches.map((m) => m.candidateId))];
  const knownIds = matchedRunIds
    .map((id) => input.runClusterIds[id])
    .filter((id): id is string => id !== undefined);
  const known = knownIds.map((id) => input.clusters[id]).filter(Boolean);
  if (known.some((c) => c.status === "never")) {
    return { action: "none", reason: "never" };
  }
  const clusterId =
    knownIds[0] ??
    (matches.find((m) => m.clusterId.length > 0)?.clusterId ||
      fallbackClusterId(matchedRunIds[0]!));
  const own = input.clusters[clusterId];
  if (own?.status === "saved") {
    return { action: "none", reason: "saved" };
  }
  if (own?.pendingQuestion === true) {
    return { action: "none", reason: "already_pending" };
  }
  return {
    action: "ask",
    clusterId,
    occurrences: matchedRunIds.length + 1,
    matchedRunIds,
    reasons: matches.map((m) => m.reason).filter((r) => r.length > 0),
  };
};
