import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake";

interface PairedDeviceOnlineBadgeProps {
  readonly isOnline: boolean;
  /** When set, distinguishes a live WebSocket from a recent heartbeat-only check-in. */
  readonly isConnected?: boolean;
}

export default function PairedDeviceOnlineBadge({
  isOnline,
  isConnected,
}: PairedDeviceOnlineBadgeProps) {
  const tier = resolveMacPresenceTier({
    isOnline,
    isConnected: isConnected ?? false,
  });

  if (tier === "live") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-800 px-2 py-0.5 text-xs font-medium text-white">
        Online
      </span>
    );
  }

  if (tier === "recent") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
        Seen recently
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
      Offline
    </span>
  );
}
