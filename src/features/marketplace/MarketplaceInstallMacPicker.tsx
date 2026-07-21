"use client";

import Link from "next/link";

import MacDevicePicker from "@/features/agent/MacDevicePicker";
import type useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

interface MarketplaceInstallMacPickerProps {
  readonly macSelection: ReturnType<typeof useMacDeviceSelection>;
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isWakeServerReachable: boolean;
}

export default function MarketplaceInstallMacPicker({
  macSelection,
  localHostname,
  localTokenHash,
  isWakeServerReachable,
}: MarketplaceInstallMacPickerProps) {
  return (
    <>
      <div className="mt-4">
        <MacDevicePicker
          devices={macSelection.devices}
          displayNameById={macSelection.displayNameById}
          selectedDeviceId={macSelection.selectedDeviceId}
          isLoading={macSelection.isLoading}
          localHostname={localHostname}
          localTokenHash={localTokenHash}
          isWakeServerReachable={isWakeServerReachable}
          onChange={macSelection.setSelectedDeviceId}
          onRenamed={macSelection.renameDevice}
        />
      </div>
      {macSelection.devices.length === 0 && !macSelection.isLoading ? (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/home" className="text-brand-700 dark:text-brand-300">
            {MAC_WORKER_BENEFIT_COPY.addMac}
          </Link>{" "}
          before installing.
        </p>
      ) : null}
    </>
  );
}
