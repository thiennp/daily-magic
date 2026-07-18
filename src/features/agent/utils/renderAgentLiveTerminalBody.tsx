"use client";

import type { ReactElement } from "react";

import AgentLiveTerminalDeveloperMirror from "@/features/agent/AgentLiveTerminalDeveloperMirror";
import type { AgentMacShellPanelProps } from "@/features/agent/types/AgentMacShellPanelProps.type";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

export const renderAgentLiveTerminalBody = (input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine: string | null;
  readonly isSteppedComposer: boolean;
  readonly macShell: AgentMacShellPanelProps;
}): ReactElement => {
  const {
    macShellStatus,
    macShellCanWrite,
    macShellLatestChunk,
    macShellChunkSeq,
    macShellClearToken,
    onMacShellInput,
    onMacShellResize,
  } = input.macShell;

  return (
    <div className={input.isSteppedComposer ? "mt-4" : undefined}>
      <AgentLiveTerminalDeveloperMirror
        output={input.output}
        status={input.status}
        pendingCommandLine={input.pendingCommandLine}
        macShellStatus={macShellStatus}
        macShellCanWrite={macShellCanWrite}
        macShellLatestChunk={macShellLatestChunk}
        macShellChunkSeq={macShellChunkSeq}
        macShellClearToken={macShellClearToken}
        onMacShellInput={onMacShellInput}
        onMacShellResize={onMacShellResize}
      />
    </div>
  );
};
