import { createHash } from "node:crypto";

import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { generateAutoSkillDraft } from "./autoSkillDraft";
import { buildScriptQuestionParts } from "./autoSkillScriptQuestion";
import type { AutoSkillModuleCluster } from "./autoSkillModule.types";
import { setClusterState } from "./autoSkillModuleClusterDb";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import {
  decideModuleCluster,
  pickClustersToAsk,
} from "./autoSkillModuleDecide";
import { buildClusterDraftRuns } from "./autoSkillModuleDraft";
import { listProjectHistorySkillgenDraftFingerprints } from "./listProjectHistorySkillgenDraftFingerprints";
import { listProjectHistorySkillgenPublishedFingerprints } from "./listProjectHistorySkillgenPublishedFingerprints";
import {
  mergeOrSkipProjectHistorySkillgenDraft,
  type ProjectHistorySkillgenDraftFingerprint,
} from "./mergeOrSkipProjectHistorySkillgenDraft";
import { extractProjectHistorySkillgenStepLines } from "./validateProjectHistorySkillgenDraft";

type ExistingSkills = {
  readonly drafts: readonly ProjectHistorySkillgenDraftFingerprint[];
  readonly published: readonly ProjectHistorySkillgenDraftFingerprint[];
};

const loadExistingSkills = (projectId: string): ExistingSkills => {
  try {
    return {
      drafts: listProjectHistorySkillgenDraftFingerprints(projectId),
      published: listProjectHistorySkillgenPublishedFingerprints(projectId),
    };
  } catch {
    return { drafts: [], published: [] };
  }
};

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
  /** Project folder: scripts are replayed in a temp copy of it. */
  readonly folderPath?: string;
  /** Distinct runs a cluster needs before it asks; 1 = judge each run alone. */
  readonly minOccurrences?: number;
  /** Skills already in the project; read from disk when omitted. */
  readonly existing?: ExistingSkills;
}): Promise<ModuleAskResult> => {
  const existing = input.existing ?? loadExistingSkills(input.projectId);
  const existingNames = [...existing.published, ...existing.drafts].map(
    (skill) => skill.name,
  );
  const toAsk = pickClustersToAsk(
    input.touched.filter(
      (cluster) =>
        decideModuleCluster({
          cluster,
          cloudPending: input.cloudPending.has(cluster.id),
          ...(input.minOccurrences !== undefined
            ? { minOccurrences: input.minOccurrences }
            : {}),
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
    const draft = await generateAutoSkillDraft(
      runs,
      input.completer,
      existingNames,
    );
    if (!draft.ok) {
      draftFailed = draft.reason !== "not_reusable";
      continue;
    }
    const duplicate = mergeOrSkipProjectHistorySkillgenDraft({
      contentHash: `sha256:${createHash("sha256").update(draft.markdown, "utf8").digest("hex")}`,
      name: draft.name,
      stepLines: extractProjectHistorySkillgenStepLines(draft.markdown),
      existingDrafts: existing.drafts,
      existingPublished: existing.published,
    });
    if (duplicate.action !== "create_new") {
      setClusterState(input.db, cluster.id, "saved");
      continue;
    }
    const parts = await buildScriptQuestionParts(draft, input.folderPath);
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
      draftBody: parts.draftBody,
      judgeLabel: input.judgeLabel,
      ...(parts.scriptInfo !== undefined
        ? { scriptInfo: parts.scriptInfo }
        : {}),
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
