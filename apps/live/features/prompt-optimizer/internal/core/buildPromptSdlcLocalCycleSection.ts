import {
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  readPromptSdlcWizardModulePassScore,
  summarizePromptSdlcWizardCompletion,
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
import { renderPromptSdlcWizardOutcome } from "./renderPromptSdlcWizardOutcome";
import { renderPromptSdlcWizardModuleResults } from "./renderPromptSdlcWizardModuleResults";
import {
  formatPromptSdlcTokenCount,
  sumPromptSdlcLocalTokens,
} from "./sumPromptSdlcLocalTokens";
import { describePromptSdlcOutcomeBadge } from "./describePromptSdlcOutcomeBadge";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  displayPromptSdlcLocalFolder,
  promptSdlcLocalWorkingDirectory,
} from "./promptSdlcLocalFolder";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

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
    cycle.status !== "wizard_paused" &&
    !isPromptSdlcLocalManualWait(cycle);
  const activity = describePromptSdlcLocalActivity(cycle);
  const steps = renderPromptSdlcLocalStepTree(
    buildPromptSdlcSteps(mapPromptSdlcLocalCycleView(cycle)),
    cycle,
  );
  const stop = isPromptSdlcTerminalStatus(cycle.status)
    ? ""
    : renderPromptSdlcLocalStopForm(cycle);
  const wizardOutcome = renderPromptSdlcWizardOutcome(cycle);
  const wizardModuleResults = renderPromptSdlcWizardModuleResults(cycle);
  const best = renderPromptSdlcLocalBestPrompt(cycle);
  const error =
    cycle.errorMessage === null
      ? ""
      : `<div class="alert-error">${escapeHtml(cycle.errorMessage)}</div>`;
  const spinner = live
    ? `<span class="sdlc-spin" aria-hidden="true"></span>`
    : "";
  const elapsed = live ? ` Working for <span data-elapsed>0s</span>.` : "";
  const wizardSummary =
    cycle.wizard !== undefined && cycle.wizard.phase === "complete"
      ? summarizePromptSdlcWizardCompletion(cycle.wizard)
      : null;
  const allModulesPassed =
    wizardSummary !== null &&
    wizardSummary.totalModules > 0 &&
    wizardSummary.passedModuleCount === wizardSummary.totalModules;
  const activitySuccess =
    !live &&
    cycle.wizard !== undefined &&
    isPromptSdlcTerminalStatus(cycle.status) &&
    (cycle.wizard.phase === "complete" ||
      summarizePromptSdlcWizardCompletion(cycle.wizard).passedModuleCount > 0);
  const activityToneClass = activitySuccess
    ? allModulesPassed
      ? " sdlc-run-activity-success"
      : " sdlc-run-activity-partial"
    : "";
  const successActions =
    activitySuccess && cycle.wizard !== undefined
      ? `<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings · New prompt clears the form.</p>`
      : // DF-035 (c): a stopped/failed wizard run still gets its report (final module states).
        !live &&
          cycle.wizard !== undefined &&
          cycle.wizard.modules.length > 0 &&
          isPromptSdlcTerminalStatus(cycle.status)
        ? `<p class="sdlc-run-success-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${escapeHtml(cycle.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`
        : "";
  const replyPreviewBlock =
    activity.replyPreview === null || activity.replyPreview.length === 0
      ? ""
      : `<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${escapeHtml(activity.replyPreview)}</pre>`;
  const detailBlock =
    activity.detail.length === 0 &&
    successActions.length === 0 &&
    replyPreviewBlock.length === 0
      ? ""
      : activity.detail.length === 0 && replyPreviewBlock.length === 0
        ? ""
        : `<div class="sdlc-run-detail-block">${activity.detail.length === 0 ? "" : `<p class="sdlc-run-detail muted">${escapeHtml(activity.detail)}${elapsed}</p>`}${replyPreviewBlock}</div>`;
  const current = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  const reference =
    cycle.status === "improving"
      ? readPromptSdlcLocalImproverReference(cycle)
      : null;
  const tokenTotal = sumPromptSdlcLocalTokens(cycle);
  const wizardEvaluateJudge =
    cycle.wizard !== undefined &&
    cycle.status === "judging" &&
    (cycle.wizard.phase === "evaluate" || cycle.wizard.gate === "evaluate");
  const manual = isPromptSdlcLocalManualWait(cycle)
    ? renderPromptSdlcLocalManualStep({
        role: cycle.status === "judging" ? "judge" : "improve",
        cycleId: cycle.id,
        promptText: reference?.promptText ?? current?.promptText ?? "",
        score: reference?.score ?? current?.judgement?.score ?? null,
        reasons: reference?.reasons ?? current?.judgement?.reasons ?? null,
        avoid: reference?.avoid ?? null,
        instructions:
          cycle.status === "judging"
            ? cycle.judgeInstructions
            : cycle.improverInstructions,
        run: current?.run ?? null,
        minJudgeScore: wizardEvaluateJudge ? 1 : 0,
      })
    : "";
  const wizardRunComplete =
    cycle.wizard !== undefined &&
    cycle.wizard.phase === "complete" &&
    isPromptSdlcTerminalStatus(cycle.status);
  const showScoreScale =
    cycle.wizard === undefined ||
    cycle.wizard.phase === "evaluate" ||
    cycle.wizard.phase === "optimize_modules" ||
    cycle.wizard.gate === "evaluate" ||
    cycle.wizard.gate === "optimize_modules";
  const scoringGuidePassScore =
    cycle.wizard !== undefined && !wizardRunComplete
      ? cycle.wizard.phase === "optimize_modules" ||
        cycle.wizard.gate === "optimize_modules"
        ? readPromptSdlcWizardModulePassScore(cycle.wizard)
        : cycle.passScore
      : cycle.passScore;
  const scoreScale = showScoreScale
    ? `<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${renderPromptSdlcLocalScoreScale(scoringGuidePassScore)}</div>`
    : "";
  const failedOutcomeBadge =
    cycle.status === "failed"
      ? describePromptSdlcOutcomeBadge({
          status: cycle.status,
          errorKind: cycle.errorKind,
        })
      : null;
  const statusBadge = live
    ? `<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>`
    : cycle.status === "wizard_paused"
      ? `<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>`
      : isPromptSdlcTerminalStatus(cycle.status)
        ? failedOutcomeBadge !== null
          ? `<span class="${failedOutcomeBadge.badgeClass}">${failedOutcomeBadge.badgeLabel}</span>`
          : wizardRunComplete && wizardSummary !== null && !allModulesPassed
            ? `<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>`
            : `<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>`
        : "";
  const activityIcon = live
    ? spinner
    : activitySuccess
      ? allModulesPassed
        ? `<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>`
        : `<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>`
      : `<span class="sdlc-run-status-dot" aria-hidden="true"></span>`;
  const metaItems = [
    typeof cycle.workingDirectory === "string" &&
    cycle.workingDirectory.length > 0
      ? `<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${escapeHtml(displayPromptSdlcLocalFolder(promptSdlcLocalWorkingDirectory(cycle)))}</li>`
      : "",
    tokenTotal > 0
      ? `<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${formatPromptSdlcTokenCount(tokenTotal)} so far</li>`
      : "",
  ].filter((item) => item.length > 0);
  const meta =
    metaItems.length === 0
      ? ""
      : `<ul class="sdlc-run-meta">${metaItems.join("")}</ul>`;
  const actions =
    stop.length === 0 ? "" : `<div class="sdlc-run-actions">${stop}</div>`;
  const timeline = wizardRunComplete
    ? ""
    : `<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${steps}</div>`;
  const gridBlock = wizardRunComplete
    ? ""
    : scoreScale.length === 0
      ? `<div class="sdlc-run-grid sdlc-run-grid-single">${timeline}</div>`
      : `<div class="sdlc-run-grid">${timeline}${scoreScale}</div>`;
  const revisions = renderPromptSdlcLocalRevisions(cycle);
  const wizardOnlySourceRevision =
    cycle.wizard !== undefined &&
    isPromptSdlcTerminalStatus(cycle.status) &&
    cycle.revisions.every(
      (revision) =>
        revision.roundNumber === 0 &&
        (revision.judgement === undefined || revision.judgement === null),
    );
  const promptsHistory =
    revisions.length === 0 || wizardOnlySourceRevision
      ? ""
      : `<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${revisions}</div></section>`;

  const runGoalChip = `<p class="sdlc-run-goal" title="${escapeHtml(cycle.goal.trim())}">${escapeHtml(promptSdlcLocalHistoryTitle(cycle.goal))}</p>`;
  const runBody = wizardRunComplete
    ? `${error}${wizardModuleResults}${wizardOutcome}${manual}${best}`
    : `${error}${gridBlock}${manual}${wizardOutcome}${best}`;
  const liveRegion = `<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>`;
  const completeNote = wizardRunComplete
    ? `<p class="muted sdlc-run-complete-note">4/4 wizard steps complete · Step 4 scores live in Module results.</p>`
    : "";
  return `<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${live ? "true" : "false"}" data-since="${escapeHtml(cycle.updatedAt)}" aria-busy="${live ? "true" : "false"}">${liveRegion}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${statusBadge}</div>${runGoalChip}<div class="sdlc-run-activity${activityToneClass}"${activitySuccess ? ' role="status"' : ""}><div class="sdlc-run-activity-icon">${activityIcon}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${escapeHtml(activity.title)}</h2>${detailBlock}${successActions}${completeNote}</div></div>${meta}${actions}</header>${runBody}</section>${promptsHistory}`;
};
