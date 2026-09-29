import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const readPromptSdlcWizardScoredRevisions = (
  cycle: PromptSdlcLocalCycle,
): readonly PromptSdlcLocalCycle["revisions"][number][] =>
  cycle.revisions.filter(
    (item) =>
      item.judgement?.score !== null && item.judgement?.score !== undefined,
  );
