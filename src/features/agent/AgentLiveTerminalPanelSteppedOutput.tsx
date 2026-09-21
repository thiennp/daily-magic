"use client";

import { useState } from "react";

import AgentLiveTerminalOutputTabs from "@/features/agent/AgentLiveTerminalOutputTabs";
import AgentLiveTerminalSteppedMirror from "@/features/agent/AgentLiveTerminalSteppedMirror";
import { buildAgentLiveTerminalPanelMirror } from "@/features/agent/utils/buildAgentLiveTerminalPanelMirror";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

interface AgentLiveTerminalPanelSteppedOutputProps extends AgentMacShellPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine: string | null;
  readonly feedbackPendingQuestion: string | null;
}

export default function AgentLiveTerminalPanelSteppedOutput(
  props: AgentLiveTerminalPanelSteppedOutputProps,
) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const terminalBody = buildAgentLiveTerminalPanelMirror({
    show: isTerminalOpen,
    output: props.output,
    status: props.status,
    pendingCommandLine: props.pendingCommandLine,
    feedbackPendingQuestion: props.feedbackPendingQuestion,
    isSteppedComposer: true,
    macShell: props,
  });

  return (
    <AgentLiveTerminalOutputTabs
      output={props.output}
      terminalBody={
        <AgentLiveTerminalSteppedMirror
          isTerminalOpen={isTerminalOpen}
          onToggleTerminal={() => {
            setIsTerminalOpen((open) => !open);
          }}
          terminalBody={terminalBody}
        />
      }
    />
  );
}
