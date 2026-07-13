"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import HomeLocalMacWakePrompt from "@/features/home/HomeLocalMacWakePrompt";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import MacDevicePicker from "@/features/wsTest/MacDevicePicker";
import type { MyMacDevice } from "@/features/wsTest/hooks/useMyMacDevices";

interface WsTestMacDispatchSectionProps {
  readonly isLibraryPlaybook: boolean;
  readonly macDevices: readonly MyMacDevice[];
  readonly macDisplayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly isMacDevicesLoading: boolean;
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onDeviceRenamed: (deviceId: string, deviceLabel: string) => void;
}

export default function WsTestMacDispatchSection({
  isLibraryPlaybook,
  macDevices,
  macDisplayNameById,
  selectedDeviceId,
  isMacDevicesLoading,
  onDeviceChange,
  onDeviceRenamed,
}: WsTestMacDispatchSectionProps) {
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const picker = (
    <>
      <MacDevicePicker
        devices={macDevices}
        displayNameById={macDisplayNameById}
        selectedDeviceId={selectedDeviceId}
        isLoading={isMacDevicesLoading}
        onChange={onDeviceChange}
        onRenamed={onDeviceRenamed}
      />
      <HomeLocalMacWakePrompt
        devices={macDevices}
        localHostname={localHostname}
        isWakeServerReachable={isWakeServerReachable}
      />
    </>
  );

  if (isLibraryPlaybook) {
    return (
      <section className="rounded-2xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Running a playbook from your library on your Mac.
        </p>
        <div className="mt-4">{picker}</div>
      </section>
    );
  }

  return <AppPanel>{picker}</AppPanel>;
}
