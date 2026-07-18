"use client";

import { useState, type ReactNode, type MouseEvent } from "react";

import MacDeviceWakeModal from "./MacDeviceWakeModal";
import { isMacDeviceRowInteractiveTarget } from "@/features/agent-witch/macDevices/utils/isMacDeviceRowInteractiveTarget";

interface MacDeviceOfflineWakeHintProps {
  readonly displayName: string;
  readonly isWakeServerReachable: boolean;
  readonly children: ReactNode;
}

export default function MacDeviceOfflineWakeHint({
  displayName,
  isWakeServerReachable,
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
        displayName={displayName}
        isWakeServerReachable={isWakeServerReachable}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
