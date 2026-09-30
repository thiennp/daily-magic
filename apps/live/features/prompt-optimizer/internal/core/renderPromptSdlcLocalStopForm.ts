import { readPromptSdlcStopControlKind } from "./readPromptSdlcStopControlKind";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const classicStopForm = (cycleId: string): string =>
  `<form method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${escapeHtml(cycleId)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`;

const wizardEndForm = (cycleId: string): string =>
  `<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions"><input type="hidden" name="cycleId" value="${escapeHtml(cycleId)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`;

const wizardModuleInterruptForm = (cycle: PromptSdlcLocalCycle): string => {
  const cycleId = escapeHtml(cycle.id);
  const moduleTitle = escapeHtml(
    cycle.wizard?.modules[cycle.wizard.currentModuleIndex]?.title ??
      "this module",
  );
  return `<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${moduleTitle}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions">
      <input type="hidden" name="cycleId" value="${cycleId}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button>
    </form>
  </div>`;
};

export const renderPromptSdlcLocalStopForm = (
  cycle: PromptSdlcLocalCycle,
): string => {
  const kind = readPromptSdlcStopControlKind(cycle);
  if (kind === "none") {
    return "";
  }
  if (kind === "classic") {
    return classicStopForm(cycle.id);
  }
  if (kind === "wizard_end_only") {
    return wizardEndForm(cycle.id);
  }
  return wizardModuleInterruptForm(cycle);
};

/** Optional tertiary control on wizard gates while paused. */
export const renderPromptSdlcWizardGateEndForm = (
  cycle: PromptSdlcLocalCycle,
): string => {
  if (cycle.wizard === undefined || cycle.status !== "wizard_paused") {
    return "";
  }
  const cycleId = escapeHtml(cycle.id);
  return `<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end"><input type="hidden" name="cycleId" value="${cycleId}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`;
};
