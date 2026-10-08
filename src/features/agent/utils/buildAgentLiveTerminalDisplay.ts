import { formatAgentLiveTerminalMarkersForDisplay } from "@/features/agent/utils/formatAgentLiveTerminalMarkersForDisplay";
import { dedupeConsecutiveLogLines } from "@/features/agent/utils/dedupeConsecutiveLogLines";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  AGENT_LIVE_BASH_PROMPT,
  getAgentLivePrompt,
  appendAgentLiveTerminalPrompt,
  buildAgentLiveTerminalCommandEntry,
  buildAgentLiveTerminalIdleLine,
} from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { stripNextActionsFromTerminalOutput } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

export const buildAgentLiveTerminalDisplay = (input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
  readonly platform?: "mac" | "linux";
}): string => {
  const platform = input.platform ?? "mac";
  const prompt = getAgentLivePrompt(platform);
  // The stored transcript always uses the mac prompt as its line marker; a
  // Linux session must not show "agent-witch@mac ~ %" (Testi run 2, a76d46ac).
  const visibleOutput =
    platform === "mac"
      ? stripNextActionsFromTerminalOutput(input.output)
      : stripNextActionsFromTerminalOutput(input.output).replaceAll(
          AGENT_LIVE_BASH_PROMPT,
          prompt,
        );

  if (visibleOutput.length === 0) {
    const pendingCommandLine = input.pendingCommandLine?.trim() ?? "";
    if (
      pendingCommandLine.length > 0 &&
      (input.status === "starting" ||
        input.status === "waiting_approval" ||
        input.status === "streaming")
    ) {
      return buildAgentLiveTerminalCommandEntry(pendingCommandLine, platform);
    }

    if (
      input.status === "finished" ||
      input.status === "error" ||
      input.status === "timed_out"
    ) {
      return `${buildAgentLiveTerminalIdleLine(platform)}No agent output was captured for this run.\n`;
    }

    return buildAgentLiveTerminalIdleLine(platform);
  }

  const formattedOutput =
    formatAgentLiveTerminalMarkersForDisplay(visibleOutput);

  if (
    input.status === "finished" &&
    !formattedOutput.endsWith(prompt) &&
    !formattedOutput.endsWith(AGENT_LIVE_BASH_PROMPT)
  ) {
    return dedupeConsecutiveLogLines(
      appendAgentLiveTerminalPrompt(formattedOutput, platform),
    );
  }

  return dedupeConsecutiveLogLines(formattedOutput);
};

export const shouldShowAgentLiveTerminalCursor = (
  status: AgentLiveTerminalStatus,
): boolean =>
  status === "idle" ||
  status === "finished" ||
  status === "error" ||
  status === "timed_out";

export const shouldShowAgentLiveTerminalLoadingIndicator = (
  status: AgentLiveTerminalStatus,
): boolean =>
  status === "starting" ||
  status === "waiting_approval" ||
  status === "streaming";

export const buildAgentLiveTerminalLoadingLine = (dotCount: number): string =>
  ".".repeat(Math.max(1, Math.min(dotCount, 3)));

/** Shown in the computer terminal mirror while the agent waits for a reply (AGENT-049). */
export const AGENT_LIVE_TERMINAL_PLEASE_ANSWER_LINE = "please answer";

export const buildAgentLiveTerminalActivityLine = (input: {
  readonly awaitingUserAnswer: boolean;
  readonly loadingDotCount: number;
}): string =>
  input.awaitingUserAnswer
    ? AGENT_LIVE_TERMINAL_PLEASE_ANSWER_LINE
    : buildAgentLiveTerminalLoadingLine(input.loadingDotCount);
