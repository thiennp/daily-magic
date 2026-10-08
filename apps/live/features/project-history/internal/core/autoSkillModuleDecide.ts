import {
  MODULE_ASK_MIN_OCCURRENCES,
  MODULE_MAX_QUESTIONS_PER_RUN,
} from "./autoSkillModule.constants";
import type {
  AutoSkillClusterState,
  AutoSkillModuleCluster,
} from "./autoSkillModule.types";

export type ModuleClusterDecision =
  | {
      readonly action: "none";
      readonly reason: "first" | "never" | "saved" | "already_pending";
    }
  | { readonly action: "ask" };

/**
 * Cluster state machine watching | asked | saved | never.
 * - the cloud is the owner's answer: a saved / never cluster stays so;
 * - a question still waiting for the owner (cloud pending) is never repeated;
 * - from MODULE_ASK_MIN_OCCURRENCES distinct runs a watching cluster asks;
 * - an "asked" cluster the owner answered "Not now" asks again, because this
 *   function runs only for clusters the new run just added an occurrence to.
 */
export const decideModuleCluster = (input: {
  readonly cluster: AutoSkillModuleCluster;
  readonly cloudPending: boolean;
}): ModuleClusterDecision => {
  const { cluster } = input;
  if (cluster.state === "never") {
    return { action: "none", reason: "never" };
  }
  if (cluster.state === "saved") {
    return { action: "none", reason: "saved" };
  }
  if (input.cloudPending) {
    return { action: "none", reason: "already_pending" };
  }
  return cluster.occurrences >= MODULE_ASK_MIN_OCCURRENCES
    ? { action: "ask" }
    : { action: "none", reason: "first" };
};

/** Cloud answers win over the local state (owner said saved / never). */
export const reconcileClusterState = (
  local: AutoSkillClusterState,
  cloud: { readonly saved: boolean; readonly never: boolean },
): AutoSkillClusterState =>
  cloud.never ? "never" : cloud.saved ? "saved" : local;

/** Strongest clusters first, at most MODULE_MAX_QUESTIONS_PER_RUN. */
export const pickClustersToAsk = (
  clusters: readonly AutoSkillModuleCluster[],
): AutoSkillModuleCluster[] =>
  [...clusters]
    .sort(
      (a, b) =>
        b.occurrences - a.occurrences || b.distinctPrompts - a.distinctPrompts,
    )
    .slice(0, MODULE_MAX_QUESTIONS_PER_RUN);
