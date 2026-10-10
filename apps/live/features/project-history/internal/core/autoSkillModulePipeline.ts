import type { AutoSkillRunRecord } from "./autoSkill.types";
import type {
  AutoSkillModule,
  AutoSkillModuleCluster,
} from "./autoSkillModule.types";
import {
  addOccurrence,
  refreshCluster,
  setClusterState,
} from "./autoSkillModuleClusterDb";
import { reconcileClusterState } from "./autoSkillModuleDecide";
import { hashAutoSkillPrompt } from "./autoSkillRedact";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import { matchModule, type ModuleMatchDeps } from "./autoSkillModuleMatch";

export type ModulePipelineResult = {
  /** Clusters this run added an occurrence to (fresh counts, owner state). */
  readonly touched: readonly AutoSkillModuleCluster[];
  readonly judgeFailed: boolean;
};

type CloudAnswers = {
  readonly saved: ReadonlySet<string>;
  readonly never: ReadonlySet<string>;
};

/** Fresh counts of the clusters, with the owner's saved / never answers applied. */
export const refreshTouchedClusters = (
  db: AutoSkillModuleDb,
  clusterIds: readonly string[],
  cloud: CloudAnswers,
): AutoSkillModuleCluster[] =>
  clusterIds
    .map((id) => refreshCluster(db, id))
    .filter((c): c is AutoSkillModuleCluster => c !== null)
    .map((c) => {
      const state = reconcileClusterState(c.state, {
        saved: cloud.saved.has(c.id),
        never: cloud.never.has(c.id),
      });
      if (state !== c.state) {
        setClusterState(db, c.id, state);
      }
      return { ...c, state };
    });

/**
 * Feed every module of the run through match -> occurrence -> cluster count.
 * `cloud` carries the owner's saved / never answers so the local cluster
 * state follows them.
 */
export const feedModulesThroughClusters = async (
  modules: readonly AutoSkillModule[],
  run: AutoSkillRunRecord,
  deps: ModuleMatchDeps,
  cloud: CloudAnswers,
): Promise<ModulePipelineResult> => {
  const clusterIds = new Set<string>();
  let judgeFailed = false;
  for (const [i, module] of modules.entries()) {
    const match = await matchModule(
      module,
      { prev: modules[i - 1]?.canonical, next: modules[i + 1]?.canonical },
      deps,
    );
    judgeFailed = judgeFailed || match.judgeFailed;
    addOccurrence(deps.db, {
      moduleId: match.moduleId,
      clusterId: match.clusterId,
      runId: run.runId,
      promptId: run.promptHash ?? hashAutoSkillPrompt(run.prompt),
      position: module.position,
    });
    clusterIds.add(match.clusterId);
  }
  const touched = refreshTouchedClusters(deps.db, [...clusterIds], cloud);
  return { touched, judgeFailed };
};
