import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

export interface PromptSdlcStep {
  readonly id: string;
  readonly label: string;
  readonly state: "done" | "active";
  readonly detail: string | null;
}

const terminalLabel = (cycle: PromptSdlcCycleView): string => {
  if (cycle.status === "passed") {
    return "Passed";
  }
  if (cycle.status === "stopped") {
    return "Stopped";
  }
  return "Failed";
};

export const buildPromptSdlcSteps = (
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
          label: `Judge scored round ${revision.roundNumber}: ${revision.judgement.score}`,
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
          label: `Judge is scoring round ${revision.roundNumber}`,
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
          label: `Improver is rewriting round ${cycle.currentRound}`,
          state: "active",
          detail: cycle.improverModel,
        },
      ]
    : [];
  const endStep: readonly PromptSdlcStep[] = isPromptSdlcTerminalStatus(
    cycle.status,
  )
    ? [
        {
          id: "end",
          label: terminalLabel(cycle),
          state: "done",
          detail: cycle.errorMessage,
        },
      ]
    : [];

  return [...revisionSteps, ...rewriteStep, ...endStep];
};
