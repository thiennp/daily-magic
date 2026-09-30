import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardSkillSuggestions = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const orchestrator = wizard.orchestratorSkill;
  const orchestratorBlock =
    orchestrator === null
      ? ""
      : `<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${escapeHtml(orchestrator.fileName)}</code> — ${escapeHtml(orchestrator.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;

  if (wizard.additionalSkillSuggestionsStatus === "pending") {
    return `<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${orchestratorBlock}<p class="muted">The judge is reading the run summary and suggesting additional skills…</p></div>`;
  }
  if (wizard.additionalSkillSuggestionsStatus === "skipped") {
    return orchestratorBlock.length === 0
      ? ""
      : `<div class="sdlc-wizard-skill-suggestions">${orchestratorBlock}</div>`;
  }
  if (wizard.additionalSkillSuggestionsStatus !== "ready") {
    return orchestratorBlock.length === 0
      ? ""
      : `<div class="sdlc-wizard-skill-suggestions">${orchestratorBlock}</div>`;
  }

  const summary =
    wizard.additionalSkillSuggestionsSummary === null ||
    wizard.additionalSkillSuggestionsSummary.trim().length === 0
      ? ""
      : `<p class="sdlc-wizard-skill-summary">${escapeHtml(wizard.additionalSkillSuggestionsSummary.trim())}</p>`;

  if (wizard.additionalSkillSuggestions.length === 0) {
    const emptyCopy =
      summary.length > 0
        ? summary
        : `<p class="muted">The judge had no additional skill suggestions for this run.</p>`;
    return `<div class="sdlc-wizard-skill-suggestions">${orchestratorBlock}${emptyCopy}</div>`;
  }

  const items = wizard.additionalSkillSuggestions
    .map(
      (item) =>
        `<li class="sdlc-wizard-skill-suggestion"><p><strong>${escapeHtml(item.name)}</strong> <code>.cursor/skills/${escapeHtml(item.fileName)}/SKILL.md</code></p><p class="muted">${escapeHtml(item.description)}</p><p>${escapeHtml(item.rationale)}</p></li>`,
    )
    .join("");

  return `<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${orchestratorBlock}${summary}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> — do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${items}</ul></div>`;
};
