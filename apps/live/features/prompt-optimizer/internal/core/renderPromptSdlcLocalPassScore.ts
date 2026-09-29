import {
  PROMPT_SDLC_PASS_SCORE,
  buildPromptSdlcScoreScale,
} from "../../../../adapters/promptSdlcAwcCore";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wholeScore = (text: string): number => {
  const score = Number(text);
  return /^\d{1,3}$/.test(text) && score >= 1 && score <= 100
    ? score
    : PROMPT_SDLC_PASS_SCORE;
};

const markLeft = (score: number): string => {
  const span = 99;
  const offset = score - 1;
  return `calc((${offset} / ${span}) * (100% - 1.15rem) + 0.575rem)`;
};

export const renderPromptSdlcLocalPassScore = (passScore: string): string => {
  const score = wholeScore(passScore);
  const weak = Math.floor(score / 2);
  const close = Math.max(weak + 1, score - 20);
  const legend = buildPromptSdlcScoreScale(score)
    .map((band) => band.label)
    .join(" · ");
  const style = `--sdlc-weak:${weak}%;--sdlc-close:${close}%;--sdlc-pass:${score}%`;
  return `<div class="field sdlc-pass"><div class="sdlc-pass-head">${renderPromptSdlcFieldHeading("Pass score", "passScore", "sdlc-pass-label")}<output class="sdlc-pass-value" data-sdlc-pass-value for="sdlc-pass">${score}</output></div><div class="sdlc-pass-scale" style="${style}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="sdlc-pass" class="sdlc-pass-range" type="range" name="passScore" min="1" max="100" step="1" value="${score}" data-sdlc-pass aria-labelledby="sdlc-pass-label"><span class="sdlc-pass-mark" style="left:${markLeft(PROMPT_SDLC_PASS_SCORE)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${PROMPT_SDLC_PASS_SCORE}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${escapeHtml(legend)}</p><p class="muted">The bar fades from a weak score to a pass. The mark is the usual ${PROMPT_SDLC_PASS_SCORE}.</p></div>`;
};
