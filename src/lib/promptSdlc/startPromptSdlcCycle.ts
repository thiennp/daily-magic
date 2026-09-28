import { buildJudgeContinuation } from "@/lib/promptSdlc/continuePromptSdlc";
import { insertPromptSdlcCycle } from "@/lib/promptSdlc/promptSdlcCycleQueries";
import { insertPromptSdlcRevision } from "@/lib/promptSdlc/promptSdlcRevisionQueries";
import { loadPromptSdlcCycleView } from "@/lib/promptSdlc/loadPromptSdlcCycleView";
import { placePromptSdlcContinuation } from "@/lib/promptSdlc/placePromptSdlcContinuation";
import { validatePromptSdlcStart } from "@/lib/promptSdlc/validatePromptSdlcStart";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export type StartPromptSdlcCycleResult =
  | { readonly ok: true; readonly cycle: PromptSdlcCycleView }
  | { readonly ok: false; readonly errorMessage: string };

export const startPromptSdlcCycle = async (input: {
  readonly ownerUserId: string;
  readonly requesterEmail: string | null;
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly deviceId: string | null;
  readonly judge: PromptSdlcModelChoice;
  readonly improver: PromptSdlcModelChoice;
}): Promise<StartPromptSdlcCycleResult> => {
  const errorMessage = validatePromptSdlcStart(input);
  if (errorMessage !== null) {
    return { ok: false, errorMessage };
  }

  const cycle = await insertPromptSdlcCycle(input);
  await insertPromptSdlcRevision({
    cycleId: cycle.id,
    roundNumber: 0,
    promptText: input.sourcePrompt.trim(),
  });
  await placePromptSdlcContinuation({
    cycle,
    continuation: buildJudgeContinuation({
      goal: cycle.goal,
      promptText: input.sourcePrompt.trim(),
      passScore: cycle.passScore,
      choice: input.judge,
    }),
    requesterEmail: input.requesterEmail,
    currentRound: 0,
  });

  const view = await loadPromptSdlcCycleView(cycle.id, input.ownerUserId);
  if (view === null) {
    return { ok: false, errorMessage: "The prompt cycle could not be loaded." };
  }

  return { ok: true, cycle: view };
};
