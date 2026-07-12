import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface HarnessManagerHeaderProps {
  readonly connectionStatus: WsTestConnectionStatus;
}

export default function HarnessManagerHeader({
  connectionStatus,
}: HarnessManagerHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Assistant rules on your Mac
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create rules in the browser and sync them to your Mac. Your online
          assistant uses these when running tasks.
        </p>
      </div>
      <ConnectionStatusBadge status={connectionStatus} />
    </div>
  );
}
