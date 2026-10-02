import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Gate callout + dialog template for a generalize/separate JSON parse failure. */
export const renderPromptSdlcWizardWriterParseFailureReply = (
  rawReply: string,
): string => {
  const trimmed = rawReply.trim();
  if (trimmed.length === 0) {
    return "";
  }
  return `<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${PROMPT_SDLC_INFO_ICON_HTML}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${escapeHtml(trimmed)}</pre></template>`;
};
