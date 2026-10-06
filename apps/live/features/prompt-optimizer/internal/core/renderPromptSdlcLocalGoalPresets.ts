import {
  PROMPT_SDLC_GOAL_PRESETS,
  type PromptSdlcGoalPreset,
} from "./promptSdlcGoalPresets.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export type PromptSdlcGoalPresetChipsOptions = {
  readonly presets?: readonly PromptSdlcGoalPreset[];
  readonly groupLabel?: string;
  readonly leadLabel?: string;
  /**
   * When set, each chip is a submit button with `name`/`value` (no script
   * needed). When omitted, chips fill the Goal field via `data-sdlc-goal-preset`.
   */
  readonly submitName?: string;
};

const renderChip = (
  preset: PromptSdlcGoalPreset,
  submitName: string | undefined,
): string => {
  const text = escapeHtml(preset.goal);
  const label = escapeHtml(preset.label);
  if (submitName === undefined) {
    return `<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${text}" title="${text}">${label}</button>`;
  }
  return `<button type="submit" class="sdlc-goal-preset-chip" name="${escapeHtml(submitName)}" value="${text}" title="${text}">${label}</button>`;
};

/** Optimizer goal chips. Reused by rule compare for sample prompts. */
export const renderPromptSdlcLocalGoalPresets = (
  options: PromptSdlcGoalPresetChipsOptions = {},
): string => {
  const presets = options.presets ?? PROMPT_SDLC_GOAL_PRESETS;
  const groupLabel = options.groupLabel ?? "Common goals";
  const leadLabel = options.leadLabel ?? "Quick fill:";
  const chips = presets
    .map((preset) => renderChip(preset, options.submitName))
    .join("");
  return `<div class="sdlc-goal-presets" role="group" aria-label="${escapeHtml(groupLabel)}"><span class="sdlc-goal-presets-label muted">${escapeHtml(leadLabel)}</span>${chips}</div>`;
};
