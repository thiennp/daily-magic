"use client";

import AgentLiveTerminalBashWindow from "@/features/agent/AgentLiveTerminalBashWindow";
import AgentMacShellXterm from "@/features/agent/AgentMacShellXterm";
import {
  buildAgentLiveTerminalDisplay,
  shouldShowAgentLiveTerminalCursor,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/useAgentLiveTerminalLoadingDots";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_TERMINAL_STATUS_LABEL } from "@/features/agent/utils/agentLiveTerminalStatusLabel.constant";
import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";
import { shouldShowLiveMacShellInTerminal } from "@/features/agent/utils/shouldShowLiveMacShellInTerminal";
import { resolvePreferStreamMirrorOverLiveShell } from "@/features/agent/utils/resolvePreferStreamMirrorOverLiveShell";

interface AgentLiveTerminalDeveloperMirrorProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
  readonly macShellStatus?: AgentMacShellStatus;
  readonly macShellCanWrite?: boolean;
  readonly macShellLatestChunk?: string | null;
  readonly macShellChunkSeq?: number;
  readonly macShellClearToken?: number;
  readonly onMacShellInput?: (data: string) => void;
  readonly onMacShellResize?: (cols: number, rows: number) => void;
}

export default function AgentLiveTerminalDeveloperMirror({
  output,
  status,
  pendingCommandLine = null,
  macShellStatus,
  macShellCanWrite = false,
  macShellLatestChunk = null,
  macShellChunkSeq = 0,
  macShellClearToken = 0,
  onMacShellInput,
  onMacShellResize,
}: AgentLiveTerminalDeveloperMirrorProps) {
  const preferStreamMirror = resolvePreferStreamMirrorOverLiveShell({
    output,
    status,
    macShellChunkSeq,
    macShellLatestChunk,
  });
  const shellIsLive = shouldShowLiveMacShellInTerminal(macShellStatus, {
    preferStreamMirror,
  });
  const displayOutput = buildAgentLiveTerminalDisplay({
    output,
    status,
    pendingCommandLine,
  });
  const showCursor = !shellIsLive && shouldShowAgentLiveTerminalCursor(status);
  const showLoadingIndicator =
    !shellIsLive && shouldShowAgentLiveTerminalLoadingIndicator(status);
  const loadingDotCount = useAgentLiveTerminalLoadingDots(showLoadingIndicator);
  const statusLabel = shellIsLive
    ? macShellStatus === "opening"
      ? "Connecting…"
      : "Live"
    : AGENT_LIVE_TERMINAL_STATUS_LABEL[status];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Local Mac terminal
        </h2>
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
          {statusLabel}
        </span>
      </div>
      {shellIsLive &&
      onMacShellInput !== undefined &&
      onMacShellResize !== undefined ? (
        <div className="mt-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 shadow-sm">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-zinc-400">
              agent-witch@mac — -zsh — 80×24
            </span>
          </div>
          <AgentMacShellXterm
            canWrite={macShellCanWrite && macShellStatus === "open"}
            writeChunk={macShellLatestChunk}
            chunkSeq={macShellChunkSeq}
            clearToken={macShellClearToken}
            onData={onMacShellInput}
            onResize={onMacShellResize}
          />
        </div>
      ) : (
        <AgentLiveTerminalBashWindow
          displayOutput={displayOutput}
          showLoadingIndicator={showLoadingIndicator}
          loadingDotCount={loadingDotCount}
          showCursor={showCursor}
        />
      )}
    </>
  );
}
