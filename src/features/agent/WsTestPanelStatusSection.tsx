import AppPanel from "@/components/surfaces/AppPanel";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

interface WsTestPanelStatusSectionProps {
  readonly isModal: boolean;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly queueCount: number;
  readonly queueMessage: string | null;
}

export default function WsTestPanelStatusSection({
  isModal,
  connectionStatus,
  queueCount,
  queueMessage,
}: WsTestPanelStatusSectionProps) {
  if (isModal) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ConnectionStatusBadge status={connectionStatus} />
        {queueCount > 0 ? (
          <p className="text-sm text-brand-700 dark:text-brand-300">
            {queueCount} queued
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <AppPanel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Send a task to your Mac or to a teammate on your team. Every job is
          saved in Job history.
        </p>
        <ConnectionStatusBadge status={connectionStatus} />
      </div>
      {queueCount > 0 ? (
        <p className="mt-3 text-sm text-brand-700 dark:text-brand-300">
          {queueCount} task{queueCount === 1 ? "" : "s"} queued for when your
          Mac connects.
        </p>
      ) : null}
      {queueMessage ? (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {queueMessage}
        </p>
      ) : null}
    </AppPanel>
  );
}
