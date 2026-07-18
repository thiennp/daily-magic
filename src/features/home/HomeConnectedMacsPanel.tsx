"use client";

import { useRouter } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { buildMacDeviceLastSeenText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceLastSeenText";
import {
  buildMacDevicesStatusLine,
  canWakeMacDeviceFromBrowser,
  countMacPresenceTiers,
} from "@/features/agent-witch/online-wake";
import { revokePairedDevice } from "@/features/agent-witch/utils/pairedDevicesApi";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface HomeConnectedMacsPanelProps {
  readonly dmgDownloadUrl: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeConnectedMacsPanel({
  dmgDownloadUrl,
  isWebSocketSupported,
  host,
}: HomeConnectedMacsPanelProps) {
  const router = useRouter();
  const { devices, displayNameById, isLoading, renameDevice } =
    useHomeConnectedMacs();
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const presenceCounts = countMacPresenceTiers(devices);
  const statusLine = buildMacDevicesStatusLine(presenceCounts);
  const hasExistingDevices = devices.length > 0;

  return (
    <AppPanel padding="compact">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Your Devices
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {statusLine}
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Checking connected Macs…
        </p>
      ) : devices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No Macs connected yet.{" "}
          <ConnectAnotherMacButton
            dmgDownloadUrl={dmgDownloadUrl}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            hasExistingDevices={hasExistingDevices}
            className="font-medium text-brand-700 hover:underline dark:text-brand-300"
          />
        </p>
      ) : (
        <ul className="mt-4 list-none space-y-4 p-0">
          {devices.map((device) => (
            <MacDeviceRow
              key={device.id}
              deviceId={device.id}
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              isOnline={device.isOnline}
              isConnected={device.isConnected}
              detailText={buildMacDeviceLastSeenText(device) ?? undefined}
              isWakeServerReachable={canWakeMacDeviceFromBrowser({
                deviceLabel: device.deviceLabel,
                localHostname,
                isWakeServerReachable,
              })}
              onRenamed={renameDevice}
              onDelegateTask={(deviceId) => {
                router.push(buildAgentComposerHref({ deviceId }), {
                  scroll: false,
                });
              }}
              onOpenShell={(deviceId) => {
                router.push(
                  buildAgentComposerHref({ deviceId, openShell: true }),
                  { scroll: false },
                );
              }}
              onDelete={async (deviceId) => {
                await revokePairedDevice(deviceId);
              }}
            />
          ))}
        </ul>
      )}

      {!isLoading && hasExistingDevices ? (
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <ConnectAnotherMacButton
            dmgDownloadUrl={dmgDownloadUrl}
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
