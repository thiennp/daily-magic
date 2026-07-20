"use client";

import { useRouter } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import HomeConnectedMacDeviceRow from "@/features/home/HomeConnectedMacDeviceRow";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import {
  buildMacDevicesStatusLine,
  countMacPresenceTiers,
} from "@/features/agent-witch/online-wake";
import { revokePairedDevice } from "@/features/agent-witch/utils/pairedDevicesApi";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

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
  const router = useRouter();
  const {
    devices,
    displayNameById,
    isLoading,
    serverInstallBundleVersion,
    renameDevice,
  } = useHomeConnectedMacs();
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
        {serverInstallBundleVersion !== null
          ? ` · Cloud bundle ${serverInstallBundleVersion}`
          : ""}
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Checking connected Macs…
        </p>
      ) : devices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No Macs connected yet.{" "}
          <ConnectAnotherMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            hasExistingDevices={hasExistingDevices}
            className="font-medium text-brand-700 hover:underline dark:text-brand-300"
          />
        </p>
      ) : (
        <ul className="mt-4 list-none space-y-4 p-0">
          {devices.map((device) => (
            <HomeConnectedMacDeviceRow
              key={device.id}
              device={device}
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              serverInstallBundleVersion={serverInstallBundleVersion}
              localHostname={localHostname}
              isWakeServerReachable={isWakeServerReachable}
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
