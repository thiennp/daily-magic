"use client";

import type { ReactElement } from "react";

import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { renderAgentLiveTerminalBody } from "@/features/agent/utils/renderAgentLiveTerminalBody";

export function buildAgentLiveTerminalPanelMirror(input: {
  readonly show: boolean;
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine: string | null;
  readonly feedbackPendingQuestion: string | null;
  readonly isSteppedComposer: boolean;
  readonly macShell: AgentMacShellPanelProps;
}): ReactElement | null {
  if (!input.show) return null;
  return renderAgentLiveTerminalBody({
    output: input.output,
    status: input.status,
    pendingCommandLine: input.pendingCommandLine,
    awaitingUserAnswer: (input.feedbackPendingQuestion ?? "").trim().length > 0,
    isSteppedComposer: input.isSteppedComposer,
    macShell: input.macShell,
  });
}
