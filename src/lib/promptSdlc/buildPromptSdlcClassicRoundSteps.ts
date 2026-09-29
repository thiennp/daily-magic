import { describePromptSdlcScoreBand } from "@/lib/promptSdlc/describePromptSdlcScore";
import type { PromptSdlcStep } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

export const buildPromptSdlcClassicRoundSteps = (
  cycle: PromptSdlcCycleView,
): readonly PromptSdlcStep[] => {
  const scoring =
    cycle.status === "judging" ||
    (cycle.status === "awaiting_local" && cycle.pendingLocal?.role === "judge");
  const rewriting =
    cycle.status === "improving" ||
    (cycle.status === "awaiting_local" &&
      cycle.pendingLocal?.role === "improve");
  const revisionSteps = cycle.revisions.flatMap((revision) => {
    const saved: PromptSdlcStep = {
      id: `round-${revision.roundNumber}`,
      label:
        revision.roundNumber === 0
          ? "Source prompt saved"
          : `Revision ${revision.roundNumber} saved`,
      state: "done",
      detail: null,
    };
    if (revision.judgement !== null && revision.judgement.score !== null) {
      return [
        saved,
        {
          id: `score-${revision.roundNumber}`,
          label: `Judge scored round ${revision.roundNumber}: ${revision.judgement.score} / 100 (${describePromptSdlcScoreBand(revision.judgement.score, cycle.passScore)})`,
          state: "done" as const,
          detail: revision.judgement.reasons,
        },
      ];
    }
    if (scoring && cycle.currentRound === revision.roundNumber) {
      return [
        saved,
        {
          id: `score-${revision.roundNumber}`,
          label: `score for round ${revision.roundNumber}...`,
          state: "active" as const,
          detail: cycle.judgeModel,
        },
      ];
    }
    return [saved];
  });
  const rewriteStep: readonly PromptSdlcStep[] = rewriting
    ? [
        {
          id: "rewrite",
          label: `revision ${cycle.currentRound + 1}...`,
          state: "active",
          detail: cycle.improverModel,
        },
      ]
    : [];
  return [...revisionSteps, ...rewriteStep];
};
