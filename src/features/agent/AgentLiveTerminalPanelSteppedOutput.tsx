"use client";

import { useState } from "react";

import AgentLiveTerminalSteppedMirror from "@/features/agent/AgentLiveTerminalSteppedMirror";
import { buildAgentLiveTerminalPanelMirror } from "@/features/agent/utils/buildAgentLiveTerminalPanelMirror";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { resolveAgentLiveProgressCleanedSource } from "@/features/agent/utils/resolveAgentLiveProgressUpdatesFromSources";

interface AgentLiveTerminalPanelSteppedOutputProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine: string | null;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
}

export default function AgentLiveTerminalPanelSteppedOutput(
  props: AgentLiveTerminalPanelSteppedOutputProps,
) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const streamOutput = resolveAgentLiveProgressCleanedSource(
    props.output,
    props.feedbackPendingPartialOutput,
  );
  const terminalBody = buildAgentLiveTerminalPanelMirror({
    show: isTerminalOpen,
    output: streamOutput,
    status: props.status,
    pendingCommandLine: props.pendingCommandLine,
    feedbackPendingQuestion: props.feedbackPendingQuestion,
    isSteppedComposer: true,
    macShell: props,
  });

  return (
    <AgentLiveTerminalSteppedMirror
      isTerminalOpen={isTerminalOpen}
      onToggleTerminal={() => {
        setIsTerminalOpen((open) => !open);
      }}
      terminalBody={terminalBody}
    />
  );
}
