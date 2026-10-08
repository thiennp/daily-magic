import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

export const AGENT_WITCH_REOPEN_RUN_INPUT_EVENT =
  "agent-witch:reopen-run-input";

export function requestAgentRunInputModalReopen(
  request: AgentRunInputRequest,
): void {
  const event = new CustomEvent(AGENT_WITCH_REOPEN_RUN_INPUT_EVENT, {
    detail: request,
  });
  window.dispatchEvent(event);
}
