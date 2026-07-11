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
          Sync rules to your machine
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create a harness request in the browser, choose which local writer
          should materialize it, and view what your online local agent reports
          back. Nothing is stored on the server.
        </p>
      </div>
      <ConnectionStatusBadge status={connectionStatus} />
    </div>
  );
}
