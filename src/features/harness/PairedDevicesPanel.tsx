"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";
import PairedDevicesList from "@/features/harness/components/PairedDevicesList";
import { usePairedDevices } from "@/features/harness/hooks/usePairedDevices";

export default function PairedDevicesPanel() {
  const pairedDevices = usePairedDevices();

  return (
    <>
      <AppPanel as="section" padding="compact" className="text-left">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Paired devices
        </h3>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Devices linked to your account. Revoke a device if the local agent
          should stop routing rules and Claude commands to that computer.
        </p>

        <PairedDevicesList
          devices={pairedDevices.devices}
          isLoading={pairedDevices.isLoading}
          onRevokeRequest={pairedDevices.requestRevoke}
          onPolicySaved={() => {
            void pairedDevices.reloadDevices();
          }}
        />

        {pairedDevices.message ? (
          <p className={`mt-4 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            {pairedDevices.message}
          </p>
        ) : null}
      </AppPanel>

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
