import type { AutoSkillRunRecord } from "./autoSkill.types";
import { createCompleterAutoSkillJudge } from "./autoSkillJudge";
import { askForRepeatedModules } from "./autoSkillModuleAsk";
import { extractModules } from "./autoSkillModuleExtract";
import { feedModulesThroughClusters } from "./autoSkillModulePipeline";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import { appendAutoSkillRun } from "./autoSkillStore";
import type {
  AutoSkillOutcome,
  OnAutoSkillRunCompletedDeps,
} from "./onAutoSkillRunCompleted.types";

export type {
  AutoSkillOutcome,
  OnAutoSkillRunCompletedDeps,
} from "./onAutoSkillRunCompleted.types";

/**
 * A run finished: split it into modules, match each against the project's
 * module clusters and raise an owner question (with a draft) for every
 * cluster that has now appeared in 2+ runs, at most two per run.
 * Never throws; every failure is a value the caller can ignore.
 */
export const onAutoSkillRunCompleted = async (
  input: {
    readonly projectId: string;
    readonly run: AutoSkillRunRecord;
    readonly folderPath?: string;
    /** Agent output holding the [[WAVE_PLAN]] block, when there is one. */
    readonly agentOutput?: string;
  },
  deps: OnAutoSkillRunCompletedDeps,
): Promise<AutoSkillOutcome> => {
  const { projectId, run } = input;
  try {
    const settings = await deps.cloud.getSettings(projectId);
    if (!settings.enabled) {
      return "disabled";
    }
    let state = appendAutoSkillRun(deps.loadState(projectId), run);
    const availability = await deps.probeAvailability(run.writerAgent);
    const choice = selectAutoSkillJudge(settings.judgePref, availability);
    await deps.cloud
      .postStatus(projectId, {
        judgeKind: choice.ok ? choice.kind : null,
        judgeLabel: choice.ok ? choice.label : null,
        pausedReason: choice.ok ? null : choice.pausedReason,
        note: choice.ok ? choice.note : null,
      })
      .catch(() => undefined);
    if (!choice.ok) {
      deps.saveState(projectId, state);
      return "paused";
    }
    const db = deps.openModuleDb();
    if (db === null) {
      deps.saveState(projectId, state);
      return "store_unavailable";
    }
    const completer = deps.makeCompleter(choice.kind, availability);
    const { modules } = await extractModules(
      run.prompt,
      input.agentOutput,
      availability.ollamaModel === null
        ? undefined
        : deps.makeCompleter("ollama", availability),
    );
    const judge = createCompleterAutoSkillJudge(completer, {
      get: (key) => state.verdictCache[key],
      set: (key, v) => {
        state = { ...state, verdictCache: { ...state.verdictCache, [key]: v } };
      },
    });
    const fed = await feedModulesThroughClusters(
      modules,
      run,
      {
        db,
        projectId,
        runId: run.runId,
        judge,
        embed: deps.embed,
        historyOn: deps.isHistoryOn(projectId),
      },
      {
        saved: new Set(settings.savedClusterIds),
        never: new Set(settings.neverClusterIds),
      },
    );
    const result = await askForRepeatedModules({
      projectId,
      run,
      knownRuns: state.runs,
      touched: fed.touched,
      cloudPending: new Set(settings.pendingClusterIds),
      db,
      cloud: deps.cloud,
      completer,
      judgeLabel: choice.label,
      ...(input.folderPath !== undefined
        ? { folderPath: input.folderPath }
        : {}),
    });
    deps.saveState(projectId, state);
    if (result.asked > 0) {
      return "asked";
    }
    if (result.draftFailed) {
      return "draft_failed";
    }
    if (fed.judgeFailed && !result.anyRepeat) {
      return "judge_failed";
    }
    return result.anyRepeat ? "not_asked" : "no_repeat";
  } catch {
    return "cloud_unavailable";
  }
};
