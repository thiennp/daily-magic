import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardScoredRevisions } from "./readPromptSdlcWizardScoredRevisions";
import { renderPromptSdlcWizardRevisionRoundJudgePromptInfo } from "./renderPromptSdlcWizardRevisionRoundJudgePromptInfo";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRevisionRoundList = (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly interactive: boolean;
  readonly selectedRound?: number | null;
  readonly caption?: string;
}): string => {
  const scored = readPromptSdlcWizardScoredRevisions(input.cycle);
  const wizard = input.cycle.wizard;
  const moduleRun =
    wizard !== undefined &&
    (wizard.gate === "optimize_modules" || wizard.phase === "optimize_modules")
      ? wizard.modules[wizard.currentModuleIndex]
      : undefined;
  const moduleBestScore = moduleRun?.statistics?.bestScore;
  const hasModuleScore =
    moduleBestScore !== null && moduleBestScore !== undefined;
  if (scored.length === 0 && input.cycle.revisions.length === 0) {
    return "";
  }
  const emptyNotice =
    scored.length === 0 && !hasModuleScore
      ? `<div class="alert-error">No scored revisions yet. ${
          input.interactive
            ? "Check the run error above, then rerun this step with feedback or restart evaluate from Step 1."
            : "Wait for runner and judge to finish this module."
        }</div>`
      : "";
  const caption =
    input.caption === undefined
      ? ""
      : `<p class="muted">${escapeHtml(input.caption)}</p>`;
  const step4Trial =
    input.cycle.wizard?.gate === "optimize_modules" ||
    input.cycle.wizard?.phase === "optimize_modules";
  const roundPrefix = (roundNumber: number): string =>
    step4Trial && roundNumber === 0 ? "Trial run" : `Round ${roundNumber}`;
  const items = input.cycle.revisions
    .map((item) => {
      const score = item.judgement?.score;
      const label =
        score === null || score === undefined
          ? `${roundPrefix(item.roundNumber)} — not scored`
          : `${roundPrefix(item.roundNumber)} — ${score}`;
      const reason = item.judgement?.reasons?.trim() ?? "";
      const reasonLine =
        reason.length === 0
          ? ""
          : `<br><span class="muted">${escapeHtml(reason)}</span>`;
      const judgeInfo = renderPromptSdlcWizardRevisionRoundJudgePromptInfo({
        cycle: input.cycle,
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        run: item.run,
      });
      if (input.interactive) {
        const checked =
          input.selectedRound === item.roundNumber ? " checked" : "";
        return `<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${item.roundNumber}"${checked}> <span class="sdlc-wizard-revision-title">${escapeHtml(label)}</span></label>${judgeInfo}${reasonLine}</li>`;
      }
      return `<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${escapeHtml(label)}</span>${judgeInfo}${reasonLine}</li>`;
    })
    .join("");
  return `${emptyNotice}${caption}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${items}</ul>`;
};
