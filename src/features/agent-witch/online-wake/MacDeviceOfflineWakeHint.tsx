"use client";

import { useState, type ReactNode, type MouseEvent } from "react";

import MacDeviceWakeModal from "./MacDeviceWakeModal";
import { isMacDeviceRowInteractiveTarget } from "@/features/agent-witch/macDevices/utils/isMacDeviceRowInteractiveTarget";

interface MacDeviceOfflineWakeHintProps {
  readonly deviceId: string;
  readonly displayName: string;
  readonly canRequestRestart: boolean;
  readonly isThisMac?: boolean;
  readonly children: ReactNode;
}

export default function MacDeviceOfflineWakeHint({
  deviceId,
  displayName,
  canRequestRestart,
  isThisMac = false,
  children,
}: MacDeviceOfflineWakeHintProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWakeModal = (event: MouseEvent<HTMLDivElement>) => {
    if (isMacDeviceRowInteractiveTarget(event.target)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClickCapture={openWakeModal}>
        {children}
      </div>
      <MacDeviceWakeModal
        isOpen={isModalOpen}
        deviceId={deviceId}
        displayName={displayName}
        canRequestRestart={canRequestRestart}
        isThisMac={isThisMac}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
