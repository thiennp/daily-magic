import { createHash } from "node:crypto";

import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";
import type { AutoSkillCloud } from "./autoSkillCloud";
import { generateAutoSkillDraft } from "./autoSkillDraft";
import { loadExistingSkills } from "./autoSkillModuleAsk";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";
import { buildScriptQuestionParts } from "./autoSkillScriptQuestion";
import { triageRun } from "./triageRun";
import { mergeOrSkipProjectHistorySkillgenDraft } from "./mergeOrSkipProjectHistorySkillgenDraft";
import type { AutoSkillOutcome } from "./onAutoSkillRunCompleted.types";
import { extractProjectHistorySkillgenStepLines } from "./validateProjectHistorySkillgenDraft";

/** Runs with less text than this have no procedure worth judging. */
const MIN_RUN_CHARS = 30;

const judgedBefore = (db: AutoSkillModuleDb, runId: string): boolean =>
  db
    .prepare("SELECT 1 FROM autoskill_run_judged WHERE run_id = ?")
    .get(runId) !== undefined;

const markJudged = (
  db: AutoSkillModuleDb,
  runId: string,
  outcome: string,
): void => {
  db.prepare(
    "INSERT OR REPLACE INTO autoskill_run_judged (run_id, outcome, judged_at) VALUES (?, ?, ?)",
  ).run(runId, outcome, new Date().toISOString());
};

/**
 * Manual scan: one AI call asks whether this run (a task or a commit) holds a
 * reusable procedure and writes the skill when it does. No step matching, so a
 * run costs one call, and a judged run is skipped on every rescan.
 */
export const evaluateRunAlone = async (input: {
  readonly projectId: string;
  readonly run: AutoSkillRunRecord;
  readonly db: AutoSkillModuleDb;
  readonly cloud: AutoSkillCloud;
  readonly completer: AutoSkillCompleter;
  readonly judgeLabel: string;
  /** Question ids the owner already saw (pending, saved or never). */
  readonly knownClusterIds: ReadonlySet<string>;
  readonly folderPath?: string;
}): Promise<AutoSkillOutcome> => {
  const { db, run } = input;
  if (judgedBefore(db, run.runId)) {
    return "no_repeat";
  }
  if (
    `${run.prompt}${run.resultSummary}${run.changes ?? ""}`.trim().length <
    MIN_RUN_CHARS
  ) {
    markJudged(db, run.runId, "too_small");
    return "no_repeat";
  }
  // A short yes/no first: most runs are one-off edits, and a whole draft costs minutes.
  const triage = await triageRun(run, input.completer);
  if (triage.kind === "failed") {
    return "judge_failed"; // not marked: the next scan tries again
  }
  if (triage.kind === "not_reusable") {
    markJudged(db, run.runId, "not_reusable");
    return "no_repeat";
  }
  const existing = loadExistingSkills(input.projectId);
  const draft = await generateAutoSkillDraft(
    [run],
    input.completer,
    [...existing.published, ...existing.drafts].map((skill) => skill.name),
  );
  if (!draft.ok) {
    if (draft.reason !== "not_reusable") {
      // Not marked: the next scan tries again. A bad answer is a draft
      // failure; the judge itself failing (out of usage, not signed in) is not.
      return draft.reason === "draft_invalid" ? "draft_failed" : "judge_failed";
    }
    markJudged(db, run.runId, "not_reusable");
    return "no_repeat";
  }
  const clusterId = `run-${createHash("sha256").update(run.runId).digest("hex").slice(0, 12)}`;
  const duplicate = mergeOrSkipProjectHistorySkillgenDraft({
    contentHash: `sha256:${createHash("sha256").update(draft.markdown, "utf8").digest("hex")}`,
    name: draft.name,
    stepLines: extractProjectHistorySkillgenStepLines(draft.markdown),
    existingDrafts: existing.drafts,
    existingPublished: existing.published,
  });
  if (
    duplicate.action !== "create_new" ||
    input.knownClusterIds.has(clusterId)
  ) {
    markJudged(db, run.runId, "duplicate");
    return "no_repeat";
  }
  const parts = await buildScriptQuestionParts(draft, input.folderPath);
  await input.cloud.postSuggestion(input.projectId, {
    clusterId,
    title: draft.name,
    prompt: run.prompt.slice(0, 1_000),
    occurrences: 1,
    matches: [
      {
        runId: run.runId,
        completedAt: run.completedAt,
        summary: run.prompt.split("\n", 1)[0]?.slice(0, 160) ?? "",
      },
    ],
    draftName: draft.name,
    draftBody: parts.draftBody,
    judgeLabel: input.judgeLabel,
    ...(parts.scriptInfo !== undefined ? { scriptInfo: parts.scriptInfo } : {}),
  });
  markJudged(db, run.runId, "asked");
  return "asked";
};
