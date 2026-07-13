"use client";

import HomeLocalMacWakePrompt from "@/features/home/HomeLocalMacWakePrompt";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { buildMacDeviceLastSeenText } from "@/features/macDevices/utils/buildMacDeviceLastSeenText";
import MacDeviceRow from "@/features/macDevices/MacDeviceRow";

export default function HomeConnectedMacsPanel() {
  const { devices, displayNameById, isLoading, renameDevice } =
    useHomeConnectedMacs();
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const onlineCount = devices.filter((device) => device.isOnline).length;

  return (
    <section>
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
          No paired Macs yet. Connect one from Your setup.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {devices.map((device) => (
            <MacDeviceRow
              key={device.id}
              deviceId={device.id}
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              isOnline={device.isOnline}
              detailText={buildMacDeviceLastSeenText(device) ?? undefined}
              onRenamed={renameDevice}
            />
          ))}
        </ul>
      )}

      <HomeLocalMacWakePrompt
        devices={devices}
        localHostname={localHostname}
        isWakeServerReachable={isWakeServerReachable}
      />
    </section>
  );
}
