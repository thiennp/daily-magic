import {
  PROMPT_SDLC_FIELD_TIPS,
  type PromptSdlcFieldTipId,
} from "./promptSdlcFieldTips.constant";
import { PROMPT_SDLC_INFO_ICON_HTML } from "./promptSdlcInfoIconHtml.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcFieldTip = (id: PromptSdlcFieldTipId): string => {
  const tip = PROMPT_SDLC_FIELD_TIPS[id];
  const panelId = `sdlc-tip-${id}`;
  return `<button type="button" class="sdlc-tip" aria-label="How to use ${escapeHtml(tip.title)}" aria-describedby="${panelId}" aria-expanded="false">${PROMPT_SDLC_INFO_ICON_HTML}<span class="sdlc-tip-panel" id="${panelId}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${escapeHtml(tip.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${escapeHtml(tip.example)}</span></span></button>`;
};

export const renderPromptSdlcFieldHeading = (
  label: string,
  tipId: PromptSdlcFieldTipId,
  labelId?: string,
): string => {
  const idAttr = labelId === undefined ? "" : ` id="${escapeHtml(labelId)}"`;
  return `<span class="field-label-row"><span class="field-label"${idAttr}>${escapeHtml(label)}</span>${renderPromptSdlcFieldTip(tipId)}</span>`;
};
