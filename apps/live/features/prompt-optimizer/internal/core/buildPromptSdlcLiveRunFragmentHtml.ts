import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { preparePromptSdlcLocalCycleForRun } from "./preparePromptSdlcLocalCycleForRun";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";

export const buildPromptSdlcLiveRunFragmentHtml = (
  storePath: string,
  cycle: PromptSdlcLocalCycle,
): string => {
  const prepared = preparePromptSdlcLocalCycleForRun(storePath, cycle);
  ensurePromptSdlcLocalCycleRunning(storePath, prepared.id);
  return `${buildPromptSdlcLocalCycleSection(prepared)}${renderPromptSdlcWizardGateSlot(prepared)}`;
};
