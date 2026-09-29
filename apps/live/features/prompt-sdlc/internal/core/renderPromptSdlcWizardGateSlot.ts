import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardGate } from "./renderPromptSdlcWizardGate";

/** Live poll replaces this slot when a wizard step finishes at a gate. */
export const renderPromptSdlcWizardGateSlot = (
  cycle: PromptSdlcLocalCycle | null,
): string =>
  `<div id="prompt-sdlc-wizard-gate-slot">${cycle === null ? "" : renderPromptSdlcWizardGate(cycle)}</div>`;
