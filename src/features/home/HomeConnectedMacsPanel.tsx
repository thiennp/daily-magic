"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import HomeLocalMacWakePrompt from "@/features/home/HomeLocalMacWakePrompt";
import PairedDeviceOnlineBadge from "@/features/harness/components/PairedDeviceOnlineBadge";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { formatPairedDeviceTimestamp } from "@/features/harness/utils/pairedDevicesApi";

export default function HomeConnectedMacsPanel() {
  const { devices, isLoading } = useHomeConnectedMacs();
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const onlineCount = devices.filter((device) => device.isOnline).length;

  return (
    <AppPanel padding="compact">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Your Macs
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {onlineCount > 0
          ? `${onlineCount} online · heartbeat every 30 seconds`
          : "Paired Macs appear here when Agent Witch is running."}
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Checking paired Macs…
        </p>
      ) : devices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No Macs paired yet. Connect one from Your setup.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {devices.map((device) => (
            <li
              key={device.id}
              className="rounded-lg border border-gray-200 px-3 py-2.5 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {device.deviceLabel ?? "Mac"}
                </p>
                <PairedDeviceOnlineBadge isOnline={device.isOnline} />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Paired {formatPairedDeviceTimestamp(device.claimedAt)}
                {device.isOnline && device.lastHeartbeatAt
                  ? ` · Heartbeat ${formatPairedDeviceTimestamp(device.lastHeartbeatAt)}`
                  : device.lastSeenAt
                    ? ` · Last seen ${formatPairedDeviceTimestamp(device.lastSeenAt)}`
                    : null}
              </p>
            </li>
          ))}
        </ul>
      )}

      <HomeLocalMacWakePrompt
        devices={devices}
        localHostname={localHostname}
        isWakeServerReachable={isWakeServerReachable}
      />
    </AppPanel>
  );
}
