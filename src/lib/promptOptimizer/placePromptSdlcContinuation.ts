import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import type { PromptSdlcContinuation } from "@/lib/promptOptimizer/continuePromptSdlc";
import { savePromptSdlcCycleProgress } from "@/lib/promptOptimizer/promptSdlcCycleQueries";
import type PromptSdlcCycleRecord from "@/lib/promptOptimizer/types/PromptSdlcCycleRecord.type";

const readDispatchErrorMessage = (message: AgentWitchMessage): string => {
  const errorMessage = message.payload?.errorMessage;
  return typeof errorMessage === "string" && errorMessage.length > 0
    ? errorMessage
    : "Dispatch failed.";
};

const saveTerminal = (
  cycle: PromptSdlcCycleRecord,
  continuation: Exclude<PromptSdlcContinuation, { type: "call" }>,
  currentRound: number,
): Promise<PromptSdlcCycleRecord | null> =>
  savePromptSdlcCycleProgress({
    cycleId: cycle.id,
    ownerUserId: cycle.ownerUserId,
    status: continuation.type,
    activeRunId: null,
    pendingLocalPrompt: null,
    pendingLocalRole: null,
    currentRound,
    errorMessage:
      continuation.type === "passed" ? null : continuation.errorMessage,
  });

export const placePromptSdlcContinuation = async (input: {
  readonly cycle: PromptSdlcCycleRecord;
  readonly continuation: PromptSdlcContinuation;
  readonly requesterEmail: string | null;
  readonly currentRound: number;
}): Promise<PromptSdlcCycleRecord | null> => {
  if (input.continuation.type !== "call") {
    return saveTerminal(input.cycle, input.continuation, input.currentRound);
  }

  if (input.continuation.choice.kind === "ollama") {
    return savePromptSdlcCycleProgress({
      cycleId: input.cycle.id,
      ownerUserId: input.cycle.ownerUserId,
      status: "awaiting_local",
      activeRunId: null,
      pendingLocalPrompt: input.continuation.prompt,
      pendingLocalRole: input.continuation.role,
      currentRound: input.currentRound,
      errorMessage: null,
    });
  }

  const writerAgent = input.continuation.choice.writerAgent;
  const targetDeviceId =
    writerAgent === "cursor-cloud"
      ? CURSOR_CLOUD_EXECUTOR_DEVICE_ID
      : (input.cycle.deviceId ?? undefined);

  if (targetDeviceId === undefined) {
    return savePromptSdlcCycleProgress({
      cycleId: input.cycle.id,
      ownerUserId: input.cycle.ownerUserId,
      status: "failed",
      activeRunId: null,
      pendingLocalPrompt: null,
      pendingLocalRole: null,
      currentRound: input.currentRound,
      errorMessage: "Choose a Mac for the writer.",
    });
  }

  const result = await dispatchClaudeRunForDashboardUser({
    runtime: getAgentWitchHub(),
    requesterUserId: input.cycle.ownerUserId,
    requesterEmail: input.requesterEmail,
    body: {
      prompt: input.continuation.prompt,
      writerAgent,
      targetDeviceId,
    },
  });

  if (!result.ok) {
    return savePromptSdlcCycleProgress({
      cycleId: input.cycle.id,
      ownerUserId: input.cycle.ownerUserId,
      status: "failed",
      activeRunId: null,
      pendingLocalPrompt: null,
      pendingLocalRole: null,
      currentRound: input.currentRound,
      errorMessage: readDispatchErrorMessage(result.message),
    });
  }

  return savePromptSdlcCycleProgress({
    cycleId: input.cycle.id,
    ownerUserId: input.cycle.ownerUserId,
    status: input.continuation.role === "judge" ? "judging" : "improving",
    activeRunId: result.run.id,
    pendingLocalPrompt: null,
    pendingLocalRole: null,
    currentRound: input.currentRound,
    errorMessage: null,
  });
};
