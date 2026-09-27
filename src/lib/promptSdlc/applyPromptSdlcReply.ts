import {
  buildJudgeContinuation,
  continueAfterImproveReply,
  continueAfterJudgeReply,
} from "@/lib/promptSdlc/continuePromptSdlc";
import { parsePromptSdlcModelChoice } from "@/lib/promptSdlc/promptSdlcModelChoice";
import { savePromptSdlcCycleProgress } from "@/lib/promptSdlc/promptSdlcCycleQueries";
import {
  insertPromptSdlcJudgement,
  insertPromptSdlcRevision,
  listPromptSdlcRevisions,
} from "@/lib/promptSdlc/promptSdlcRevisionQueries";
import { placePromptSdlcContinuation } from "@/lib/promptSdlc/placePromptSdlcContinuation";
import type PromptSdlcCycleRecord from "@/lib/promptSdlc/types/PromptSdlcCycleRecord.type";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

const failCycle = (
  cycle: PromptSdlcCycleRecord,
  errorMessage: string,
): Promise<PromptSdlcCycleRecord | null> =>
  savePromptSdlcCycleProgress({
    cycleId: cycle.id,
    ownerUserId: cycle.ownerUserId,
    status: "failed",
    activeRunId: null,
    pendingLocalPrompt: null,
    pendingLocalRole: null,
    currentRound: cycle.currentRound,
    errorMessage,
  });

export const applyPromptSdlcReply = async (input: {
  readonly cycle: PromptSdlcCycleRecord;
  readonly role: PromptSdlcCallRole;
  readonly raw: string;
  readonly requesterEmail: string | null;
}): Promise<void> => {
  const judge = parsePromptSdlcModelChoice(
    input.cycle.judgeKind,
    input.cycle.judgeModel,
  );
  const improver = parsePromptSdlcModelChoice(
    input.cycle.improverKind,
    input.cycle.improverModel,
  );
  const revisions = await listPromptSdlcRevisions(input.cycle.id);
  const current = revisions.find(
    (revision) => revision.roundNumber === input.cycle.currentRound,
  );

  if (judge === null || improver === null || current === undefined) {
    await failCycle(input.cycle, "The prompt revision is missing.");
    return;
  }

  if (input.role === "judge") {
    const judged = continueAfterJudgeReply({
      raw: input.raw,
      round: input.cycle.currentRound,
      maxRounds: input.cycle.maxRounds,
      passScore: input.cycle.passScore,
      goal: input.cycle.goal,
      promptText: current.promptText,
      improver,
    });
    await insertPromptSdlcJudgement({
      cycleId: input.cycle.id,
      revisionId: current.id,
      judgeKind: judge.kind,
      judgeModel: input.cycle.judgeModel,
      verdict: judged.verdict,
      rawReply: input.raw,
    });
    await placePromptSdlcContinuation({
      cycle: input.cycle,
      continuation: judged.continuation,
      requesterEmail: input.requesterEmail,
      currentRound: input.cycle.currentRound,
    });
    return;
  }

  const improved = continueAfterImproveReply({
    raw: input.raw,
    judge,
    goal: input.cycle.goal,
    passScore: input.cycle.passScore,
  });
  if (improved.nextPrompt === null) {
    await placePromptSdlcContinuation({
      cycle: input.cycle,
      continuation: improved.continuation,
      requesterEmail: input.requesterEmail,
      currentRound: input.cycle.currentRound,
    });
    return;
  }

  const nextRound = input.cycle.currentRound + 1;
  await insertPromptSdlcRevision({
    cycleId: input.cycle.id,
    roundNumber: nextRound,
    promptText: improved.nextPrompt,
  });
  await placePromptSdlcContinuation({
    cycle: input.cycle,
    continuation: buildJudgeContinuation({
      goal: input.cycle.goal,
      promptText: improved.nextPrompt,
      passScore: input.cycle.passScore,
      choice: judge,
    }),
    requesterEmail: input.requesterEmail,
    currentRound: nextRound,
  });
};
