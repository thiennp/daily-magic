import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";

export const buildPromptSdlcLiveRunFragmentHtml = (
  storePath: string,
  cycle: PromptSdlcLocalCycle,
): string => {
  ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);
  return `${buildPromptSdlcLocalCycleSection(cycle)}${renderPromptSdlcWizardGateSlot(cycle)}`;
};
