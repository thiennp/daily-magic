import { HARNESS_CONNECTION_LABELS } from "@/features/harness/constants/harnessConnectionLabels.constant";
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
          Local harness
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create a harness request in the browser, choose which local writer
          should materialize it, and view what your online local agent reports
          back. Nothing is stored on the server.
        </p>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Status:{" "}
        <span className="font-medium text-brand-600 dark:text-brand-400">
          {HARNESS_CONNECTION_LABELS[connectionStatus]}
        </span>
      </p>
    </div>
  );
}
