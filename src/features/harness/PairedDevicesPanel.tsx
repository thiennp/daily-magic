"use client";

import PairedDeviceListItem from "@/features/harness/components/PairedDeviceListItem";
import { usePairedDevices } from "@/features/harness/hooks/usePairedDevices";

export default function PairedDevicesPanel() {
  const { devices, isLoading, message, revokeDevice } = usePairedDevices();

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Paired devices
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Devices linked to your account. Revoke a device if the local agent
        should stop routing harness and Claude commands to that computer.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading devices…
        </p>
      ) : null}

      {!isLoading && devices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No paired devices yet.
        </p>
      ) : null}

      {!isLoading && devices.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {devices.map((device) => (
            <PairedDeviceListItem
              key={device.id}
              device={device}
              onRevoke={revokeDevice}
            />
          ))}
        </ul>
      ) : null}

      {message ? (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </section>
  );
}
