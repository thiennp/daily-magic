import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRevisionRoundPromptInfo = (input: {
  readonly roundLabel: string;
  readonly promptText: string;
}): string => {
  const trimmed = input.promptText.trim();
  if (trimmed.length === 0) {
    return "";
  }
  const roundLabel = input.roundLabel.trim();
  return `<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${escapeHtml(roundLabel)}">${PROMPT_SDLC_INFO_ICON_HTML}</button><template data-sdlc-revision-round-prompt><h2>Prompt — ${escapeHtml(roundLabel)}</h2><pre class="mono sdlc-exact-prompt-pre">${escapeHtml(trimmed)}</pre></template>`;
};
