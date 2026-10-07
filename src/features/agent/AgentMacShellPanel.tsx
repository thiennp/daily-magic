"use client";

import AgentMacShellXterm from "@/features/agent/AgentMacShellXterm";
import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";

interface AgentMacShellPanelProps {
  readonly status: AgentMacShellStatus;
  readonly canWrite: boolean;
  readonly latestChunk: string | null;
  readonly chunkSeq: number;
  readonly clearToken: number;
  readonly onInput: (data: string) => void;
  readonly onResize: (cols: number, rows: number) => void;
  readonly onClose: () => void;
}

export default function AgentMacShellPanel({
  status,
  canWrite,
  latestChunk,
  chunkSeq,
  clearToken,
  onInput,
  onResize,
  onClose,
}: AgentMacShellPanelProps) {
  if (status === "idle") {
    return null;
  }

  return (
    <section className="mt-4 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-awc-fg dark:text-white/90">
          Mac shell
          {canWrite ? "" : " (view only)"}
          {status === "opening" ? " — connecting…" : ""}
        </p>
        <button
          type="button"
          className="rounded-md px-2 py-1 text-xs text-awc-fg-muted hover:bg-awc-tile dark:text-gray-300 dark:hover:bg-white/5"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <AgentMacShellXterm
        canWrite={canWrite && status === "open"}
        writeChunk={latestChunk}
        chunkSeq={chunkSeq}
        clearToken={clearToken}
        onData={onInput}
        onResize={onResize}
      />
    </section>
  );
}
