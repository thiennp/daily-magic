import type { AutoSkillJudge } from "./autoSkill.types";
import {
  MODULE_CANONICAL_CAP,
  MODULE_COMPARE_WINDOW,
  MODULE_PREVIEW_CAP,
} from "./autoSkillModule.constants";
import type { AutoSkillModule } from "./autoSkillModule.types";
import { pickModuleCandidates } from "./autoSkillModuleCandidates";
import { ensureCluster } from "./autoSkillModuleClusterDb";
import {
  findModuleByHash,
  insertModule,
  listRecentModules,
  type AutoSkillModuleDb,
} from "./autoSkillModuleDb";

export type ModuleMatchDeps = {
  readonly db: AutoSkillModuleDb;
  readonly projectId: string;
  readonly runId: string;
  readonly judge: AutoSkillJudge;
  /** Embedding of the canonical text, or null when Ollama is unavailable. */
  readonly embed: (text: string) => Promise<Float32Array | null>;
  /** History OFF: store a short preview and no vector (hash stays full). */
  readonly historyOn: boolean;
};

export type ModuleMatchResult = {
  readonly moduleId: string;
  readonly clusterId: string;
  readonly via: "hash" | "judge" | "new";
  readonly judgeFailed: boolean;
};

const withContext = (
  module: AutoSkillModule,
  prev: string | undefined,
  next: string | undefined,
): string =>
  [
    module.canonical,
    prev === undefined ? "" : `(previous step: ${prev.slice(0, 120)})`,
    next === undefined ? "" : `(next step: ${next.slice(0, 120)})`,
  ]
    .filter((p) => p.length > 0)
    .join(" ");

/**
 * Hash equality, else embedding/Jaccard neighbours judged SAME / SIMILAR /
 * DIFFERENT (existing judge port; previous + next step as context). SAME or
 * SIMILAR joins that cluster; otherwise the module starts a new cluster.
 */
export const matchModule = async (
  module: AutoSkillModule,
  context: { readonly prev?: string; readonly next?: string },
  deps: ModuleMatchDeps,
): Promise<ModuleMatchResult> => {
  const { db, projectId } = deps;
  const known = findModuleByHash(db, projectId, module.hash);
  if (known !== null) {
    return {
      moduleId: known.id,
      clusterId: known.clusterId,
      via: "hash",
      judgeFailed: false,
    };
  }
  const vector = await deps.embed(module.canonical);
  const candidates = pickModuleCandidates(
    module.canonical,
    vector,
    listRecentModules(db, projectId, MODULE_COMPARE_WINDOW),
  );
  const judged =
    candidates.length === 0
      ? null
      : await deps.judge({
          newPrompt: withContext(module, context.prev, context.next),
          candidates: candidates.map((c) => ({
            id: c.clusterId,
            prompt: c.text,
          })),
        });
  const verdicts = judged?.ok === true ? judged.verdicts : [];
  const hit =
    verdicts.find((v) => v.verdict === "SAME") ??
    verdicts.find((v) => v.verdict === "SIMILAR");
  const clusterId = hit?.candidateId ?? `mod-${module.hash.slice(0, 12)}`;
  const text = deps.historyOn
    ? module.canonical.slice(0, MODULE_CANONICAL_CAP)
    : module.canonical.slice(0, MODULE_PREVIEW_CAP);
  ensureCluster(db, { id: clusterId, projectId, label: text });
  const moduleId = `m-${module.hash.slice(0, 16)}`;
  insertModule(db, {
    id: moduleId,
    projectId,
    clusterId,
    hash: module.hash,
    text,
    vector: deps.historyOn ? vector : null,
    verb: module.verb,
    target: module.target,
    paramsJson: JSON.stringify(module.params.map((p) => p.name)),
    runId: deps.runId,
  });
  return {
    moduleId,
    clusterId,
    via: hit === undefined ? "new" : "judge",
    judgeFailed: judged?.ok === false,
  };
};
