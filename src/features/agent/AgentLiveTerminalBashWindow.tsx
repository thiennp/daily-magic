"use client";

import { useEffect, useRef } from "react";

import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { buildAgentLiveTerminalActivityLine } from "@/features/agent/utils/buildAgentLiveTerminalDisplay";

interface AgentLiveTerminalBashWindowProps {
  readonly displayOutput: string;
  readonly showLoadingIndicator: boolean;
  readonly loadingDotCount: number;
  readonly awaitingUserAnswer?: boolean;
  readonly showCursor: boolean;
}

export default function AgentLiveTerminalBashWindow({
  displayOutput,
  showLoadingIndicator,
  loadingDotCount,
  awaitingUserAnswer = false,
  showCursor,
}: AgentLiveTerminalBashWindowProps) {
  const outputRef = useRef<HTMLPreElement>(null);
  const showActivityLine = showLoadingIndicator || awaitingUserAnswer;

  useEffect(() => {
    const element = outputRef.current;
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, [
    displayOutput,
    loadingDotCount,
    showCursor,
    showActivityLine,
    awaitingUserAnswer,
  ]);

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-400">
          agent-witch@mac — -zsh — 80×24
        </span>
      </div>
      <pre
        ref={outputRef}
        className={`${APP_SURFACE_BASH_TERMINAL_PRE_CLASS} max-h-96 min-h-48 whitespace-pre-wrap break-words border-0 rounded-none`}
      >
        {displayOutput}
        {showActivityLine ? (
          <>
            {"\n"}
            <span
              className={
                awaitingUserAnswer ? "text-amber-300" : "text-zinc-400"
              }
            >
              {buildAgentLiveTerminalActivityLine({
                awaitingUserAnswer,
                loadingDotCount,
              })}
            </span>
          </>
        ) : null}
        {showCursor ? (
          <span className="animate-pulse text-emerald-400">▍</span>
        ) : null}
      </pre>
    </div>
  );
}
