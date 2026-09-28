import {
  buildPromptSdlcSteps,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  renderPromptSdlcLocalScoreScale,
  renderPromptSdlcLocalStepTree,
} from "./buildPromptSdlcLocalStepTree";
import { renderPromptSdlcLocalBestPrompt } from "./renderPromptSdlcLocalBestPrompt";
import { describePromptSdlcLocalActivity } from "./buildPromptSdlcLocalActivity";
import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import { mapPromptSdlcLocalCycleView } from "./mapPromptSdlcLocalCycleView";
import { readPromptSdlcLocalImproverReference } from "./readPromptSdlcLocalImproverReference";
import { renderPromptSdlcLocalManualStep } from "./renderPromptSdlcLocalManualStep";
import { renderPromptSdlcLocalRevisions } from "./renderPromptSdlcLocalRevisions";
import { renderPromptSdlcLocalStopForm } from "./renderPromptSdlcLocalStopForm";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  displayPromptSdlcLocalFolder,
  promptSdlcLocalWorkingDirectory,
} from "./promptSdlcLocalFolder";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildPromptSdlcLocalCycleSection = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const live =
    !isPromptSdlcTerminalStatus(cycle.status) &&
    !isPromptSdlcLocalManualWait(cycle);
  const activity = describePromptSdlcLocalActivity(cycle);
  const steps = renderPromptSdlcLocalStepTree(
    buildPromptSdlcSteps(mapPromptSdlcLocalCycleView(cycle)),
    cycle,
  );
  const stop = isPromptSdlcTerminalStatus(cycle.status)
    ? ""
    : renderPromptSdlcLocalStopForm(cycle.id);
  const best = renderPromptSdlcLocalBestPrompt(cycle);
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
  const reference =
    cycle.status === "improving"
      ? readPromptSdlcLocalImproverReference(cycle)
      : null;
  const manual = isPromptSdlcLocalManualWait(cycle)
    ? renderPromptSdlcLocalManualStep({
        role: cycle.status === "judging" ? "judge" : "improve",
        cycleId: cycle.id,
        promptText: reference?.promptText ?? current?.promptText ?? "",
        score: reference?.score ?? current?.judgement?.score ?? null,
        reasons: reference?.reasons ?? current?.judgement?.reasons ?? null,
        history: reference?.history ?? null,
      })
    : "";
  return `<section class="card" id="prompt-sdlc-run" data-live="${live ? "true" : "false"}" data-since="${escapeHtml(cycle.updatedAt)}" aria-busy="${live ? "true" : "false"}"><p class="eyebrow">This run</p><div class="sdlc-working">${spinner}<div><h2>${escapeHtml(activity.title)}</h2>${detail}${folder}${stop}</div></div>${error}${renderPromptSdlcLocalScoreScale(cycle.passScore)}${steps}${best}${manual}</section>${renderPromptSdlcLocalRevisions(cycle)}`;
};
