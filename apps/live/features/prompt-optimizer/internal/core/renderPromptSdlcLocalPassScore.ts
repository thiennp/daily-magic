import {
  PROMPT_SDLC_PASS_SCORE,
  buildPromptSdlcScoreScale,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcFieldTipId } from "./promptSdlcFieldTips.constant";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wholeScore = (text: string, fallback: number): number => {
  const score = Number(text);
  return /^\d{1,3}$/.test(text) && score >= 1 && score <= 100
    ? score
    : fallback;
};

const markLeft = (score: number): string => {
  const span = 99;
  const offset = score - 1;
  return `calc((${offset} / ${span}) * (100% - 1.15rem) + 0.575rem)`;
};

export type RenderPromptSdlcLocalPassScoreFieldInput = {
  readonly fieldTipKey: PromptSdlcFieldTipId;
  readonly label: string;
  readonly inputName: string;
  readonly inputId: string;
  readonly passScore: string;
  readonly defaultScore: number;
  readonly usualMark?: number;
};

export const renderPromptSdlcLocalPassScoreField = (
  input: RenderPromptSdlcLocalPassScoreFieldInput,
): string => {
  const score = wholeScore(input.passScore, input.defaultScore);
  const weak = Math.floor(score / 2);
  const close = Math.max(weak + 1, score - 20);
  const legend = buildPromptSdlcScoreScale(score)
    .map((band) => band.label)
    .join(" · ");
  const usualMark = input.usualMark ?? PROMPT_SDLC_PASS_SCORE;
  const style = `--sdlc-weak:${weak}%;--sdlc-close:${close}%;--sdlc-pass:${score}%`;
  const labelId = `${input.inputId}-label`;
  return `<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${renderPromptSdlcFieldHeading(input.label, input.fieldTipKey, labelId)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${escapeHtml(input.inputId)}">${score}</output></div><div class="sdlc-pass-scale" style="${style}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${escapeHtml(input.inputId)}" class="sdlc-pass-range" type="range" name="${escapeHtml(input.inputName)}" min="1" max="100" step="1" value="${score}" data-sdlc-pass aria-labelledby="${escapeHtml(labelId)}"><span class="sdlc-pass-mark" style="left:${markLeft(usualMark)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${usualMark}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${escapeHtml(legend)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${usualMark}.</p></div>`;
};

export const renderPromptSdlcLocalPassScore = (passScore: string): string =>
  renderPromptSdlcLocalPassScoreField({
    fieldTipKey: "passScore",
    label: "Pass score",
    inputName: "passScore",
    inputId: "sdlc-pass",
    passScore,
    defaultScore: PROMPT_SDLC_PASS_SCORE,
    usualMark: PROMPT_SDLC_PASS_SCORE,
  });
