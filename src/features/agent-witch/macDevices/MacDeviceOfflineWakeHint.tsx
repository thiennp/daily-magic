"use client";

import { useState, type ReactNode, type MouseEvent } from "react";

import MacDeviceWakeModal from "@/features/agent-witch/macDevices/MacDeviceWakeModal";

interface MacDeviceOfflineWakeHintProps {
  readonly displayName: string;
  readonly isWakeServerReachable: boolean;
  readonly children: ReactNode;
}

const stopEvent = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

export default function MacDeviceOfflineWakeHint({
  displayName,
  isWakeServerReachable,
  children,
}: MacDeviceOfflineWakeHintProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: MouseEvent<HTMLButtonElement>) => {
    stopEvent(event);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group relative">
        {children}
        <div className="pointer-events-none absolute left-0 top-full z-20 w-64 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-theme-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            If your Mac is online but shows offline,{" "}
            <button
              type="button"
              onClick={openModal}
              className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
            >
              click here
            </button>{" "}
            to reactivate it.
          </div>
        </div>
      </div>
      <MacDeviceWakeModal
        isOpen={isModalOpen}
        displayName={displayName}
        isWakeServerReachable={isWakeServerReachable}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
