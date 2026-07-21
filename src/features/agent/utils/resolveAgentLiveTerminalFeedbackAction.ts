import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export type AgentLiveTerminalFeedbackPreferredMode = "queue" | "steer";

export type AgentLiveTerminalFeedbackAction =
  | { readonly kind: "answer-input" }
  | { readonly kind: "queue-while-working" }
  | { readonly kind: "send-follow-up" }
  | { readonly kind: "queue-run" }
  | { readonly kind: "noop" };

export const resolveAgentLiveTerminalFeedbackAction = (input: {
  readonly message: string;
  readonly status: AgentLiveTerminalStatus;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly hasPendingInput: boolean;
  readonly hasOpenSession: boolean;
  readonly preferredMode?: AgentLiveTerminalFeedbackPreferredMode;
}): AgentLiveTerminalFeedbackAction => {
  if (input.message.trim().length === 0) {
    return { kind: "noop" };
  }

  if (input.hasPendingInput) {
    return { kind: "answer-input" };
  }

  if (isAgentLiveTerminalWorking(input.status)) {
    if (input.preferredMode === "steer") {
      return { kind: "send-follow-up" };
    }

    return { kind: "queue-while-working" };
  }

  if (input.connectionStatus === "connected" && input.hasOpenSession) {
    return { kind: "send-follow-up" };
  }

  if (input.hasOpenSession) {
    return { kind: "queue-run" };
  }

  return { kind: "noop" };
};
