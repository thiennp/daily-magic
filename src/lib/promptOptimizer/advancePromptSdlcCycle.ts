import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { applyPromptSdlcReply } from "@/lib/promptOptimizer/applyPromptSdlcReply";
import { claimPromptSdlcActiveRun } from "@/lib/promptOptimizer/claimPromptSdlcCycleStep";
import { loadPromptSdlcCycleView } from "@/lib/promptOptimizer/loadPromptSdlcCycleView";
import { isPromptSdlcTerminalStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import {
  getPromptSdlcCycleForOwner,
  savePromptSdlcCycleProgress,
} from "@/lib/promptOptimizer/promptSdlcCycleQueries";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

const WAITING_RUN_STATUSES: readonly string[] = [
  AgentRunStatus.PENDING_APPROVAL,
  AgentRunStatus.RUNNING,
];

export const advancePromptSdlcCycle = async (input: {
  readonly cycleId: string;
  readonly ownerUserId: string;
  readonly requesterEmail: string | null;
}): Promise<PromptSdlcCycleView | null> => {
  const cycle = await getPromptSdlcCycleForOwner(
    input.cycleId,
    input.ownerUserId,
  );
  if (cycle === null) {
    return null;
  }

  if (
    isPromptSdlcTerminalStatus(cycle.status) ||
    cycle.status === "awaiting_local" ||
    cycle.activeRunId === null
  ) {
    return loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
  }

  const run = await getAgentRunById(cycle.activeRunId);
  if (run === null || WAITING_RUN_STATUSES.includes(run.status)) {
    return loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
  }

  const claimed = await claimPromptSdlcActiveRun({
    cycleId: cycle.id,
    ownerUserId: cycle.ownerUserId,
    runId: cycle.activeRunId,
  });
  if (!claimed) {
    return loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
  }

  if (run.status !== AgentRunStatus.COMPLETED) {
    await savePromptSdlcCycleProgress({
      cycleId: cycle.id,
      ownerUserId: cycle.ownerUserId,
      status: "failed",
      activeRunId: null,
      pendingLocalPrompt: null,
      pendingLocalRole: null,
      currentRound: cycle.currentRound,
      errorMessage: run.denialReason ?? "The model run did not finish.",
    });
    return loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
  }

  await applyPromptSdlcReply({
    cycle,
    role: cycle.status === "improving" ? "improve" : "judge",
    raw: run.resultOutput ?? "",
    requesterEmail: input.requesterEmail,
  });

  return loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
};
