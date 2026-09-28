import {
  buildPromptSdlcSteps,
  isPromptSdlcTerminalStatus,
  type PromptSdlcCycleView,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  renderPromptSdlcLocalScoreScale,
  renderPromptSdlcLocalStepTree,
} from "./buildPromptSdlcLocalStepTree";
import { describePromptSdlcLocalActivity } from "./buildPromptSdlcLocalActivity";
import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import { renderPromptSdlcLocalManualStep } from "./renderPromptSdlcLocalManualStep";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  displayPromptSdlcLocalFolder,
  promptSdlcLocalWorkingDirectory,
} from "./promptSdlcLocalFolder";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const toCycleView = (cycle: PromptSdlcLocalCycle): PromptSdlcCycleView => ({
  id: cycle.id,
  goal: cycle.goal,
  judgeModel: cycle.judgeModel,
  improverModel: cycle.improverModel,
  status: cycle.status,
  currentRound: cycle.currentRound,
  maxRounds: cycle.maxRounds,
  passScore: cycle.passScore,
  errorMessage: cycle.errorMessage,
  activeRunId: null,
  activeRunStatus: null,
  pendingLocal: null,
  revisions: cycle.revisions.map((revision) => ({
    id: `${cycle.id}-${revision.roundNumber}`,
    roundNumber: revision.roundNumber,
    promptText: revision.promptText,
    judgement:
      revision.judgement === null
        ? null
        : {
            score: revision.judgement.score,
            passed: revision.judgement.passed,
            reasons: revision.judgement.reasons,
            rawReply: revision.judgement.rawReply,
            judgeModel: cycle.judgeModel,
          },
  })),
});

const renderRevision = (
  revision: PromptSdlcLocalCycle["revisions"][number],
): string => {
  const score =
    revision.judgement?.score === null || revision.judgement === null
      ? "Not scored yet"
      : `Score ${revision.judgement.score}`;
  const writerFailure = describePromptSdlcWriterTerminalFailure(
    revision.promptText,
  );
  const reasons = revision.judgement?.reasons
    ? `<p class="muted">${escapeHtml(revision.judgement.reasons)}</p>`
    : "";
  const title =
    revision.roundNumber === 0
      ? "Source prompt"
      : `Revision ${revision.roundNumber}`;
  const body =
    writerFailure === null
      ? `<pre class="mono">${escapeHtml(revision.promptText)}</pre>`
      : `<div class="alert-error">${escapeHtml(writerFailure)}</div>`;
  return `<article class="card"><h2>${title}</h2><p class="muted">${score}</p>${reasons}${body}</article>`;
};

export const buildPromptSdlcLocalCycleSection = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const live =
    !isPromptSdlcTerminalStatus(cycle.status) &&
    !isPromptSdlcLocalManualWait(cycle);
  const activity = describePromptSdlcLocalActivity(cycle);
  const steps = renderPromptSdlcLocalStepTree(
    buildPromptSdlcSteps(toCycleView(cycle)),
  );
  const error =
    cycle.errorMessage === null
      ? ""
      : `<div class="alert-error">${escapeHtml(cycle.errorMessage)}</div>`;
  const spinner = live
    ? `<span class="sdlc-spin" aria-hidden="true"></span>`
    : "";
  const elapsed = live ? ` Working for <span data-elapsed>0s</span>.` : "";
  const detail =
    activity.detail.length === 0
      ? ""
      : `<p class="muted">${escapeHtml(activity.detail)}${elapsed}</p>`;
  const folder =
    typeof cycle.workingDirectory === "string" &&
    cycle.workingDirectory.length > 0
      ? `<p class="muted">Folder ${escapeHtml(displayPromptSdlcLocalFolder(promptSdlcLocalWorkingDirectory(cycle)))}</p>`
      : "";
  const current = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  const manual = isPromptSdlcLocalManualWait(cycle)
    ? renderPromptSdlcLocalManualStep({
        role: cycle.status === "judging" ? "judge" : "improve",
        cycleId: cycle.id,
        promptText: current?.promptText ?? "",
        score: current?.judgement?.score ?? null,
        reasons: current?.judgement?.reasons ?? null,
      })
    : "";
  return `<section class="card" id="prompt-sdlc-run" data-live="${live ? "true" : "false"}" data-since="${escapeHtml(cycle.updatedAt)}" aria-busy="${live ? "true" : "false"}"><p class="eyebrow">This run</p><div class="sdlc-working">${spinner}<div><h2>${escapeHtml(activity.title)}</h2>${detail}${folder}</div></div>${error}${renderPromptSdlcLocalScoreScale(cycle.passScore)}${steps}${manual}</section>${cycle.revisions.map(renderRevision).join("")}`;
};
