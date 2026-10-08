import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { generateAutoSkillDraft } from "./autoSkillDraft";
import type { AutoSkillModuleCluster } from "./autoSkillModule.types";
import { setClusterState } from "./autoSkillModuleClusterDb";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import {
  decideModuleCluster,
  pickClustersToAsk,
} from "./autoSkillModuleDecide";
import { buildClusterDraftRuns } from "./autoSkillModuleDraft";

export type ModuleAskResult = {
  readonly asked: number;
  readonly draftFailed: boolean;
  /** Some touched cluster is already a repeat (asked before or not now). */
  readonly anyRepeat: boolean;
};

/**
 * Decide per touched cluster, keep the strongest (cap per run), draft a
 * SKILL.md from the cluster's occurrences and raise one owner question each.
 */
export const askForRepeatedModules = async (input: {
  readonly projectId: string;
  readonly run: AutoSkillRunRecord;
  readonly knownRuns: readonly AutoSkillRunRecord[];
  readonly touched: readonly AutoSkillModuleCluster[];
  readonly cloudPending: ReadonlySet<string>;
  readonly db: AutoSkillModuleDb;
  readonly cloud: AutoSkillCloud;
  readonly completer: AutoSkillCompleter;
  readonly judgeLabel: string;
}): Promise<ModuleAskResult> => {
  const toAsk = pickClustersToAsk(
    input.touched.filter(
      (cluster) =>
        decideModuleCluster({
          cluster,
          cloudPending: input.cloudPending.has(cluster.id),
        }).action === "ask",
    ),
  );
  let asked = 0;
  let draftFailed = false;
  for (const cluster of toAsk) {
    const runs = buildClusterDraftRuns(
      input.db,
      cluster.id,
      input.knownRuns,
      input.run,
    );
    const draft = await generateAutoSkillDraft(runs, input.completer);
    if (!draft.ok) {
      draftFailed = true;
      continue;
    }
    await input.cloud.postSuggestion(input.projectId, {
      clusterId: cluster.id,
      title: draft.name,
      prompt: input.run.prompt.slice(0, 1_000),
      occurrences: cluster.occurrences,
      moduleLabel: cluster.label.slice(0, 160),
      distinctPrompts: cluster.distinctPrompts,
      matches: runs.map((r) => ({
        runId: r.runId,
        completedAt: r.completedAt,
        summary: r.prompt.split("\n", 1)[0]?.slice(0, 160) ?? "",
      })),
      draftName: draft.name,
      draftBody: draft.markdown,
      judgeLabel: input.judgeLabel,
    });
    setClusterState(input.db, cluster.id, "asked");
    asked += 1;
  }
  return {
    asked,
    draftFailed,
    anyRepeat: input.touched.some((c) => c.occurrences >= 2),
  };
};
