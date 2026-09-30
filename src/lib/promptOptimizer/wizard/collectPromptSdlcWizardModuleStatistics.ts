import { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";

import type PromptSdlcWizardModuleStatistics from "./types/PromptSdlcWizardModuleStatistics.type";

export const collectPromptSdlcWizardModuleStatistics = (input: {
  readonly revisions: readonly {
    readonly roundNumber: number;
    readonly promptText: string;
    readonly judgement: {
      readonly score: number | null;
      readonly passed: boolean | null;
    } | null;
    readonly run?: { readonly output: string; readonly tokens: number | null };
  }[];
}): PromptSdlcWizardModuleStatistics => {
  const rounds = input.revisions.map((revision) => ({
    roundNumber: revision.roundNumber,
    score: revision.judgement?.score ?? null,
    passed: revision.judgement?.passed ?? null,
    runOutput: revision.run?.output ?? null,
    tokens: revision.run?.tokens ?? null,
  }));
  const best = selectPromptSdlcBestPrompt(
    input.revisions.map((revision) => ({
      roundNumber: revision.roundNumber,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? null,
      reasons: null,
    })),
  );
  const bestRevision =
    best === null
      ? null
      : input.revisions.find(
          (revision) => revision.roundNumber === best.roundNumber,
        );
  return {
    bestScore: best?.score ?? null,
    bestRound: best?.roundNumber ?? null,
    bestRunOutput: bestRevision?.run?.output ?? null,
    rounds,
  };
};
