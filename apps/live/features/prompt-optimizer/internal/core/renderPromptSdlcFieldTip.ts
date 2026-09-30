import {
  PROMPT_SDLC_FIELD_TIPS,
  type PromptSdlcFieldTipId,
} from "./promptSdlcFieldTips.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const INFO_ICON = `<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>`;

export const renderPromptSdlcFieldTip = (id: PromptSdlcFieldTipId): string => {
  const tip = PROMPT_SDLC_FIELD_TIPS[id];
  const panelId = `sdlc-tip-${id}`;
  return `<button type="button" class="sdlc-tip" aria-label="How to use ${escapeHtml(tip.title)}" aria-describedby="${panelId}" aria-expanded="false">${INFO_ICON}<span class="sdlc-tip-panel" id="${panelId}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${escapeHtml(tip.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${escapeHtml(tip.example)}</span></span></button>`;
};

export const renderPromptSdlcFieldHeading = (
  label: string,
  tipId: PromptSdlcFieldTipId,
  labelId?: string,
): string => {
  const idAttr = labelId === undefined ? "" : ` id="${escapeHtml(labelId)}"`;
  return `<span class="field-label-row"><span class="field-label"${idAttr}>${escapeHtml(label)}</span>${renderPromptSdlcFieldTip(tipId)}</span>`;
};
