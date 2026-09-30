import { PROMPT_SDLC_GOAL_PRESETS } from "./promptSdlcGoalPresets.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcLocalGoalPresets = (): string => {
  const chips = PROMPT_SDLC_GOAL_PRESETS.map(
    (preset) =>
      `<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${escapeHtml(preset.goal)}" title="${escapeHtml(preset.goal)}">${escapeHtml(preset.label)}</button>`,
  ).join("");
  return `<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${chips}</div>`;
};
