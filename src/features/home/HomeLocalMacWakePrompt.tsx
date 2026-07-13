"use client";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import type { MyMacDevice } from "@/features/wsTest/hooks/useMyMacDevices";
import { buildAgentWitchWakeTerminalCommand } from "@/lib/agentWitch/buildAgentWitchWakeTerminalCommand";
import { deviceLabelMatchesLocalHost } from "@/lib/agentWitch/deviceLabelMatchesLocalHost";
import { requestAgentWitchWake } from "@/lib/agentWitch/requestAgentWitchWake";

interface HomeLocalMacWakePromptProps {
  readonly devices: readonly MyMacDevice[];
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
}

const findOfflineLocalMac = (
  devices: readonly MyMacDevice[],
  localHostname: string,
): MyMacDevice | undefined =>
  devices.find(
    (device) =>
      !device.isOnline &&
      deviceLabelMatchesLocalHost(device.deviceLabel, localHostname),
  );

export default function HomeLocalMacWakePrompt({
  devices,
  localHostname,
  isWakeServerReachable,
}: HomeLocalMacWakePromptProps) {
  if (localHostname === null) {
    return null;
  }

  const offlineLocalMac = findOfflineLocalMac(devices, localHostname);
  if (offlineLocalMac === undefined) {
    return null;
  }

  const wakeCommand = buildAgentWitchWakeTerminalCommand();
  const displayName = offlineLocalMac.deviceLabel ?? localHostname;

  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/80 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
      <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
        This Mac ({displayName}) is offline
      </p>
      <p className="mt-1 text-xs text-amber-800 dark:text-amber-300/90">
        You are browsing from this computer, but Agent Witch is not connected.
        Run this in Terminal to wake it up:
      </p>
      <CopyableBashCommand command={wakeCommand} variant="bash" />
      {isWakeServerReachable ? (
        <button
          type="button"
          onClick={() => {
            void requestAgentWitchWake();
          }}
          className="mt-3 text-xs font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Try waking Agent Witch from this browser
        </button>
      ) : null}
    </div>
  );
}
