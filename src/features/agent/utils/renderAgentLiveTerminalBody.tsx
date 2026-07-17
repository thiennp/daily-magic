"use client";

import type { ReactElement } from "react";

import AgentLiveTerminalDeveloperMirror from "@/features/agent/AgentLiveTerminalDeveloperMirror";
import AgentMacShellPanel from "@/features/agent/AgentMacShellPanel";
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
    macShellStatus = "idle",
    macShellCanWrite = false,
    macShellLatestChunk = null,
    macShellChunkSeq = 0,
    macShellClearToken = 0,
    onMacShellInput,
    onMacShellResize,
    onMacShellClose,
  } = input.macShell;
  const showMacShell =
    macShellStatus !== "idle" &&
    onMacShellInput !== undefined &&
    onMacShellResize !== undefined &&
    onMacShellClose !== undefined;

  if (showMacShell) {
    return (
      <AgentMacShellPanel
        status={macShellStatus}
        canWrite={macShellCanWrite}
        latestChunk={macShellLatestChunk}
        chunkSeq={macShellChunkSeq}
        clearToken={macShellClearToken}
        onInput={onMacShellInput}
        onResize={onMacShellResize}
        onClose={onMacShellClose}
      />
    );
  }

  return (
    <div className={input.isSteppedComposer ? "mt-4" : undefined}>
      <AgentLiveTerminalDeveloperMirror
        output={input.output}
        status={input.status}
        pendingCommandLine={input.pendingCommandLine}
      />
    </div>
  );
};
