import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Shown while a wizard step is actively running (gate is null). The pause gate
 * card only appears after the writer/runner finishes.
 */
export const renderPromptSdlcWizardStepInProgress = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const wizard = cycle.wizard;
  if (
    wizard === undefined ||
    wizard.gate !== null ||
    cycle.status === "wizard_paused" ||
    isPromptSdlcTerminalStatus(cycle.status)
  ) {
    return "";
  }

  if (wizard.phase === "separate" && wizard.splitOptions.length === 0) {
    return `<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 3 — Separate</p>
    <h2>Suggesting module splits</h2>
    <p class="muted">The writer is proposing split options. <strong>This run</strong> below updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;
  }

  if (wizard.phase === "optimize_modules" && wizard.modules.length > 0) {
    const index = wizard.currentModuleIndex;
    const moduleRun = wizard.modules[index];
    const title = moduleRun?.title ?? "Module";
    return `<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 4 — Optimize modules</p>
    <h2>Module ${index + 1} of ${wizard.modules.length}: ${escapeHtml(title)}</h2>
    <p class="muted">The runner executes this module in your folder, then the judge scores it. When the round finishes, the Step 4 review gate appears here. Until then, watch <strong>This run</strong> below.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;
  }

  if (wizard.phase === "evaluate") {
    return `<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 2 — Evaluate</p>
    <h2>Scoring prompt revisions</h2>
    <p class="muted">The judge is revising and scoring prompt text. <strong>This run</strong> below updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;
  }

  if (wizard.phase === "generalize") {
    return `<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step">
    <p class="eyebrow">Step 1 — Generalize</p>
    <h2>Generalizing your prompt</h2>
    <p class="muted">The writer is building {{variables}}. <strong>This run</strong> below updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;
  }

  return "";
};
