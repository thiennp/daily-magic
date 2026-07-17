"use client";

import AgentLiveTerminalBashWindow from "@/features/agent/AgentLiveTerminalBashWindow";
import {
  buildAgentLiveTerminalDisplay,
  shouldShowAgentLiveTerminalCursor,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/useAgentLiveTerminalLoadingDots";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_TERMINAL_STATUS_LABEL } from "@/features/agent/utils/agentLiveTerminalStatusLabel.constant";

interface AgentLiveTerminalDeveloperMirrorProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
}

export default function AgentLiveTerminalDeveloperMirror({
  output,
  status,
  pendingCommandLine = null,
}: AgentLiveTerminalDeveloperMirrorProps) {
  const displayOutput = buildAgentLiveTerminalDisplay({
    output,
    status,
    pendingCommandLine,
  });
  const showCursor = shouldShowAgentLiveTerminalCursor(status);
  const showLoadingIndicator =
    shouldShowAgentLiveTerminalLoadingIndicator(status);
  const loadingDotCount = useAgentLiveTerminalLoadingDots(showLoadingIndicator);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Local Mac terminal
        </h2>
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
          {AGENT_LIVE_TERMINAL_STATUS_LABEL[status]}
        </span>
      </div>
      <AgentLiveTerminalBashWindow
        displayOutput={displayOutput}
        showLoadingIndicator={showLoadingIndicator}
        loadingDotCount={loadingDotCount}
        showCursor={showCursor}
      />
    </>
  );
}
