"use client";

import Button from "@/components/ui/button/Button";
import AgentLiveProgressActivityDot from "@/features/agent/AgentLiveProgressActivityDot";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";

interface AgentLiveProgressFeedHeaderActionsProps {
  readonly isWorking: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly onStopRun?: () => void;
  readonly onDeleteRun?: () => void;
}

export default function AgentLiveProgressFeedHeaderActions({
  isWorking,
  workingEllipsis,
  connectionStatus,
  onStopRun,
  onDeleteRun,
}: AgentLiveProgressFeedHeaderActionsProps) {
  if (!isWorking && onDeleteRun === undefined) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-2">
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
      {isWorking && onStopRun !== undefined ? (
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
