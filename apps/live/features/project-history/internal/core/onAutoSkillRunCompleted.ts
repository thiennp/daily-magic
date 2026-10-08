import type {
  AutoSkillAvailability,
  AutoSkillCluster,
  AutoSkillCompleter,
  AutoSkillJudgeKind,
  AutoSkillRunRecord,
  AutoSkillVerdict,
} from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { decideAutoSkillRepeat } from "./autoSkillDecide";
import { generateAutoSkillDraft } from "./autoSkillDraft";
import { createCompleterAutoSkillJudge } from "./autoSkillJudge";
import {
  isExactAutoSkillRepeat,
  prefilterAutoSkillCandidates,
} from "./autoSkillPromptSimilarity";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import { appendAutoSkillRun, type AutoSkillState } from "./autoSkillStore";

export type OnAutoSkillRunCompletedDeps = {
  readonly cloud: AutoSkillCloud;
  readonly loadState: (projectId: string) => AutoSkillState;
  readonly saveState: (projectId: string, state: AutoSkillState) => void;
  readonly probeAvailability: (
    writerOfRun: string | null,
  ) => Promise<AutoSkillAvailability>;
  readonly makeCompleter: (
    kind: AutoSkillJudgeKind,
    availability: AutoSkillAvailability,
  ) => AutoSkillCompleter;
};

export type AutoSkillOutcome =
  | "disabled"
  | "cloud_unavailable"
  | "paused"
  | "judge_failed"
  | "draft_failed"
  | "no_repeat"
  | "not_asked"
  | "asked";

const clustersFrom = (
  settings: Awaited<ReturnType<AutoSkillCloud["getSettings"]>>,
): Record<string, AutoSkillCluster> => {
  const entry = (
    id: string,
    status: AutoSkillCluster["status"],
    pending: boolean,
  ): [string, AutoSkillCluster] => [
    id,
    { clusterId: id, status, runIds: [], pendingQuestion: pending },
  ];
  return Object.fromEntries([
    ...settings.pendingClusterIds.map((id) => entry(id, "open", true)),
    ...settings.savedClusterIds.map((id) => entry(id, "saved", false)),
    ...settings.neverClusterIds.map((id) => entry(id, "never", false)),
  ]);
};

const exactVerdicts = (
  run: AutoSkillRunRecord,
  earlier: readonly AutoSkillRunRecord[],
): AutoSkillVerdict[] =>
  earlier
    .filter((e) => isExactAutoSkillRepeat(run.prompt, e.prompt))
    .map((e) => ({
      candidateId: e.runId,
      verdict: "SAME",
      reason: "identical request",
      clusterId: "",
    }));

/**
 * A run finished: record it, and when it is the 2nd+ occurrence of a kind of
 * task (judged, not exact-matched) raise an owner question with a draft.
 * Never throws; every failure is a value the caller can ignore.
 */
export const onAutoSkillRunCompleted = async (
  input: {
    readonly projectId: string;
    readonly run: AutoSkillRunRecord;
    readonly folderPath?: string;
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
    const earlier = state.runs.filter((r) => r.runId !== run.runId);
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
    const completer = deps.makeCompleter(choice.kind, availability);
    const exact = exactVerdicts(run, earlier);
    const candidates = prefilterAutoSkillCandidates(
      run.prompt,
      earlier.filter((e) => !exact.some((v) => v.candidateId === e.runId)),
    );
    let verdicts: readonly AutoSkillVerdict[] = exact;
    if (candidates.length > 0) {
      const judged = await createCompleterAutoSkillJudge(completer, {
        get: (key) => state.verdictCache[key],
        set: (key, v) => {
          state = {
            ...state,
            verdictCache: { ...state.verdictCache, [key]: v },
          };
        },
      })({ newPrompt: run.prompt, candidates });
      if (!judged.ok) {
        deps.saveState(projectId, state);
        return "judge_failed";
      }
      verdicts = [...exact, ...judged.verdicts];
    }
    const decision = decideAutoSkillRepeat({
      newRunId: run.runId,
      verdicts,
      runClusterIds: state.runClusterIds,
      clusters: clustersFrom(settings),
    });
    if (decision.action === "none") {
      deps.saveState(projectId, state);
      return decision.reason === "first" ? "no_repeat" : "not_asked";
    }
    const matched = earlier.filter((r) =>
      decision.matchedRunIds.includes(r.runId),
    );
    const draft = await generateAutoSkillDraft([...matched, run], completer);
    if (!draft.ok) {
      deps.saveState(projectId, state);
      return "draft_failed";
    }
    await deps.cloud.postSuggestion(projectId, {
      clusterId: decision.clusterId,
      title: draft.name,
      prompt: run.prompt.slice(0, 1_000),
      occurrences: decision.occurrences,
      matches: matched.map((r) => ({
        runId: r.runId,
        completedAt: r.completedAt,
        summary: r.prompt.slice(0, 160),
      })),
      draftName: draft.name,
      draftBody: draft.markdown,
      judgeLabel: choice.label,
    });
    const assigned = Object.fromEntries(
      [run, ...matched].map((r) => [r.runId, decision.clusterId]),
    );
    deps.saveState(projectId, {
      ...state,
      runClusterIds: { ...state.runClusterIds, ...assigned },
    });
    return "asked";
  } catch {
    return "cloud_unavailable";
  }
};
