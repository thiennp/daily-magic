import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const classicStopForm = (cycleId: string): string =>
  `<form method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${escapeHtml(cycleId)}"><button class="btn btn-secondary" type="submit">Finish</button><span class="muted">Stops the writers and keeps the best prompt. This run counts as complete.</span></form>`;

const wizardModuleInterruptForm = (cycle: PromptSdlcLocalCycle): string => {
  const cycleId = escapeHtml(cycle.id);
  const moduleTitle = escapeHtml(
    cycle.wizard?.modules[cycle.wizard.currentModuleIndex]?.title ??
      "this module",
  );
  return `<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${moduleTitle}</strong>. Skip this module or finish the whole wizard.</p>
    <form method="POST" action="/prompt-sdlc" class="sdlc-wizard-interrupt-actions">
      <input type="hidden" name="cycleId" value="${cycleId}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">Finish wizard</button>
    </form>
  </div>`;
};

export const renderPromptSdlcLocalStopForm = (
  cycle: PromptSdlcLocalCycle,
): string => {
  if (isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }
  const wizard = cycle.wizard;
  if (
    wizard !== undefined &&
    wizard.phase === "optimize_modules" &&
    cycle.status !== "wizard_paused" &&
    wizard.gate === null
  ) {
    return wizardModuleInterruptForm(cycle);
  }
  return classicStopForm(cycle.id);
};
