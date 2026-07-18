import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export type AgentLiveProgressStepState = "done" | "active" | "pending";

export const resolveAgentLiveProgressStepStates = (input: {
  readonly started: boolean;
  readonly isFinished: boolean;
  readonly isWorking: boolean;
  readonly needsInput: boolean;
  readonly isReadyBanner: boolean;
  readonly status: AgentLiveTerminalStatus;
}): {
  readonly prepareState: AgentLiveProgressStepState;
  readonly startState: AgentLiveProgressStepState;
  readonly workState: AgentLiveProgressStepState;
  readonly finishState: AgentLiveProgressStepState;
} => {
  // Failed before the Mac confirmed ready — do not mark "Agent started".
  if (input.status === "error" && !input.isReadyBanner) {
    return {
      prepareState: "done",
      startState: "pending",
      workState: "pending",
      finishState: "pending",
    };
  }

  const prepareState: AgentLiveProgressStepState =
    input.started ||
    input.isFinished ||
    input.isReadyBanner ||
    input.status !== "idle"
      ? "done"
      : "active";
  const startState: AgentLiveProgressStepState = !input.started
    ? input.isReadyBanner || input.status === "starting"
      ? "active"
      : "pending"
    : "done";
  const workState: AgentLiveProgressStepState = !input.started
    ? "pending"
    : input.needsInput || input.status === "waiting_approval"
      ? "active"
      : input.isFinished
        ? "done"
        : input.isWorking
          ? "active"
          : "pending";

  return {
    prepareState,
    startState,
    workState,
    finishState: input.isFinished ? "done" : "pending",
  };
};
