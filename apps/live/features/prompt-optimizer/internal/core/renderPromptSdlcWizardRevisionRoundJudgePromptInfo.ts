import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardRevisionRoundJudgePrompt } from "./readPromptSdlcWizardRevisionRoundJudgePrompt";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRevisionRoundJudgePromptInfo = (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly roundNumber: number;
  readonly promptText: string;
  readonly run?: PromptSdlcLocalCycle["revisions"][number]["run"];
}): string => {
  const judgePrompt = readPromptSdlcWizardRevisionRoundJudgePrompt(
    input.cycle,
    {
      promptText: input.promptText,
      run: input.run,
    },
  );
  if (judgePrompt === null) {
    return "";
  }
  const roundLabel = `Round ${input.roundNumber}`;
  return `<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${escapeHtml(roundLabel)}">${PROMPT_SDLC_INFO_ICON_HTML}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt — ${escapeHtml(roundLabel)}</h2><pre class="mono sdlc-exact-prompt-pre">${escapeHtml(judgePrompt)}</pre></template>`;
};
