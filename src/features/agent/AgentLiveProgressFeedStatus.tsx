"use client";

import AgentLiveProgressActivityBar from "@/features/agent/AgentLiveProgressActivityBar";
import AgentLiveProgressActivityDot from "@/features/agent/AgentLiveProgressActivityDot";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";
import { resolveAgentLiveProgressConnectionHint } from "@/features/agent/utils/resolveAgentLiveProgressConnectionHint";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";

interface AgentLiveProgressFeedStatusProps {
  readonly isWorking: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly msSinceLastActivity: number | null;
  readonly stallState: AgentLiveProgressStallState;
}

export default function AgentLiveProgressFeedStatus({
  isWorking,
  workingEllipsis,
  connectionStatus,
  msSinceLastActivity,
  stallState,
}: AgentLiveProgressFeedStatusProps) {
  const connectionHint = resolveAgentLiveProgressConnectionHint({
    connectionStatus,
    lastMacUpdateLabel:
      formatAgentLiveProgressLastMacUpdate(msSinceLastActivity),
  });
  const connectionHintTone =
    connectionStatus === "connected"
      ? "text-gray-600 dark:text-gray-300"
      : "text-amber-800 dark:text-amber-200";

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white/90">
          Progress on your Mac
        </h3>
        {isWorking ? (
          <span
            className="inline-flex items-center gap-1.5 text-xs text-brand-700 dark:text-brand-300"
            aria-live="polite"
          >
            <ConnectionStatusBadge status={connectionStatus} />
            <AgentLiveProgressActivityDot />
            In progress{workingEllipsis}
          </span>
        ) : null}
      </div>
      {isWorking ? (
        <p className={`mt-2 text-xs ${connectionHintTone}`} role="status">
          {connectionHint}
        </p>
      ) : null}
      {isWorking ? <AgentLiveProgressActivityBar /> : null}
      {stallState === "stuck" ? (
        <p
          className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
          role="status"
        >
          Your Mac has not sent updates for a while. Open Home to wake Agent
          Witch or try sending the task again.
        </p>
      ) : null}
      {stallState === "warning" ? (
        <p
          className="mt-3 text-sm text-gray-600 dark:text-gray-300"
          role="status"
        >
          Still waiting for your Mac agent — this is taking longer than usual…
        </p>
      ) : null}
    </>
  );
}
