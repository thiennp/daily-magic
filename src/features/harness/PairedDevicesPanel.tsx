"use client";

import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import PairedDevicesList from "@/features/harness/components/PairedDevicesList";
import { usePairedDevices } from "@/features/harness/hooks/usePairedDevices";

export default function PairedDevicesPanel() {
  const pairedDevices = usePairedDevices();

  return (
    <>
      <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Paired devices
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Devices linked to your account. Revoke a device if the local agent
          should stop routing harness and Claude commands to that computer.
        </p>

        <PairedDevicesList
          devices={pairedDevices.devices}
          isLoading={pairedDevices.isLoading}
          onRevokeRequest={pairedDevices.requestRevoke}
        />

        {pairedDevices.message ? (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {pairedDevices.message}
          </p>
        ) : null}
      </section>

      <ConfirmDestructiveModal
        isOpen={pairedDevices.pendingDeviceId !== null}
        title="Revoke device?"
        description={`Stop routing tasks to ${
          pairedDevices.pendingDevice?.deviceLabel ?? "this computer"
        }. You will need to pair again after reinstalling the local agent.`}
        confirmLabel="Revoke device"
        onClose={pairedDevices.cancelRevoke}
        onConfirm={() => {
          void pairedDevices.confirmRevoke();
        }}
      />
    </>
  );
}
