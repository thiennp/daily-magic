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
  readonly onDeleteRun?: () => void;
}

export default function AgentLiveProgressFeedStopControl({
  isWorking,
  isStopping,
  workingEllipsis,
  connectionStatus,
  onStopRun,
  onDeleteRun,
}: AgentLiveProgressFeedStopControlProps) {
  if (!isWorking && !isStopping && onDeleteRun === undefined) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2">
      {isWorking || isStopping ? (
        isStopping ? (
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
        )
      ) : null}
      {isWorking && !isStopping && onStopRun !== undefined ? (
        <Button size="sm" variant="outline" onClick={onStopRun}>
          Stop
        </Button>
      ) : null}
      {onDeleteRun !== undefined ? (
        <Button
          size="sm"
          variant="outline"
          onClick={onDeleteRun}
          className="text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
        >
          Delete
        </Button>
      ) : null}
    </span>
  );
}
