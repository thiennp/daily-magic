import type { AutoSkillRunRecord } from "./autoSkill.types";
import { askForRepeatedModules } from "./autoSkillModuleAsk";
import { evaluateRunAlone } from "./evaluateRunAlone";
import { feedRun } from "./feedAutoSkillRun";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import { appendAutoSkillRun } from "./autoSkillStore";
import { hasProcessedAutoSkillRun } from "./hasProcessedAutoSkillRun";
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
    /** Shown on the strip instead of the judge note (a scan's "Checking 2 of 5"). */
    readonly statusNote?: string;
    /** Manual scan: one AI call judges this run alone, no second occurrence needed. */
    readonly evaluateEachRun?: boolean;
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
    const availability = await deps.probeAvailability(
      run.writerAgent,
      settings.judgeAgent ?? null,
    );
    const choice = selectAutoSkillJudge(settings.judgePref, availability);
    await deps.cloud
      .postStatus(projectId, {
        judgeKind: choice.ok ? choice.kind : null,
        judgeLabel: choice.ok ? choice.label : null,
        pausedReason: choice.ok ? null : choice.pausedReason,
        note: input.statusNote ?? (choice.ok ? choice.note : null),
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
    if (input.evaluateEachRun === true) {
      deps.saveState(projectId, state);
      return evaluateRunAlone({
        projectId,
        run,
        db,
        cloud: deps.cloud,
        completer,
        judgeLabel: choice.label,
        knownClusterIds: new Set([
          ...settings.pendingClusterIds,
          ...settings.savedClusterIds,
          ...settings.neverClusterIds,
        ]),
        ...(input.folderPath !== undefined
          ? { folderPath: input.folderPath }
          : {}),
      });
    }
    if (hasProcessedAutoSkillRun(db, run.runId)) {
      return "no_repeat";
    }
    const fed = await feedRun({
      run,
      agentOutput: input.agentOutput,
      db,
      projectId,
      completer,
      availability,
      deps,
      answers: {
        saved: new Set(settings.savedClusterIds),
        never: new Set(settings.neverClusterIds),
      },
      verdictCache: state.verdictCache,
      onVerdict: (key, v) => {
        state = {
          ...state,
          verdictCache: { ...state.verdictCache, [key]: v },
        };
      },
    });
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
