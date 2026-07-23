"use client";

import Button from "@/components/ui/button/Button";
import AgentLiveProgressActivityDot from "@/features/agent/AgentLiveProgressActivityDot";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";

interface AgentLiveProgressFeedStopControlProps {
  readonly isWorking: boolean;
  readonly isStopping: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly onStopRun?: () => void;
}

export default function AgentLiveProgressFeedStopControl({
  isWorking,
  isStopping,
  workingEllipsis,
  connectionStatus,
  onStopRun,
}: AgentLiveProgressFeedStopControlProps) {
  if (!isWorking && !isStopping) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2">
      {isStopping ? (
        <span
          className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-300"
          aria-live="polite"
        >
          <ConnectionStatusBadge status={connectionStatus} />
          Stopping on your Mac…
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 text-xs text-brand-700 dark:text-brand-300"
          aria-live="polite"
        >
          <ConnectionStatusBadge status={connectionStatus} />
          <AgentLiveProgressActivityDot />
          In progress{workingEllipsis}
        </span>
      )}
      {isWorking && !isStopping && onStopRun !== undefined ? (
        <Button size="sm" variant="outline" onClick={onStopRun}>
          Stop
        </Button>
      ) : null}
    </span>
  );
}
