"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import MacDeviceRow from "@/features/macDevices/MacDeviceRow";
import { buildMacDeviceLastSeenText } from "@/features/macDevices/utils/buildMacDeviceLastSeenText";
import { canWakeMacDeviceFromBrowser } from "@/features/macDevices/utils/canWakeMacDeviceFromBrowser";

interface HomeConnectedMacsPanelProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeConnectedMacsPanel({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeConnectedMacsPanelProps) {
  const { devices, displayNameById, isLoading, renameDevice } =
    useHomeConnectedMacs();
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const onlineCount = devices.filter((device) => device.isOnline).length;
  const hasExistingDevices = devices.length > 0;

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
          No paired Macs yet.{" "}
          <ConnectAnotherMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            hasExistingDevices={hasExistingDevices}
            className="font-medium text-brand-700 hover:underline dark:text-brand-300"
          />
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
              isWakeServerReachable={canWakeMacDeviceFromBrowser({
                deviceLabel: device.deviceLabel,
                localHostname,
                isWakeServerReachable,
              })}
              onRenamed={renameDevice}
            />
          ))}
        </ul>
      )}

      {!isLoading && hasExistingDevices ? (
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <ConnectAnotherMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            hasExistingDevices={hasExistingDevices}
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          />
        </div>
      ) : null}
    </AppPanel>
  );
}
