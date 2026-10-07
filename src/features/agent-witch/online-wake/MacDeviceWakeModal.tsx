"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { refreshPairedDevices } from "@/features/agent-witch/pairedDevicesResource";
import MacDeviceWakeOfflineLede from "@/features/agent-witch/online-wake/MacDeviceWakeOfflineLede";
import MacDeviceWakeShellCommandBlock from "@/features/agent-witch/online-wake/MacDeviceWakeShellCommandBlock";
import {
  requestAgentWitchWake,
  requestLocalAgentWitchRestartFromWakeServer,
} from "@/features/agent-witch/online-wake";

interface MacDeviceWakeModalProps {
  readonly isOpen: boolean;
  readonly deviceId: string;
  readonly displayName: string;
  readonly canRequestRestart: boolean;
  readonly isThisMac?: boolean;
  readonly onClose: () => void;
}

export default function MacDeviceWakeModal({
  isOpen,
  deviceId,
  displayName,
  canRequestRestart,
  isThisMac = false,
  onClose,
}: MacDeviceWakeModalProps) {
  const [isRestartingLocally, setIsRestartingLocally] = useState(false);
  const [localRestartMessage, setLocalRestartMessage] = useState<string | null>(
    null,
  );
  const [
    showWakeCommandAfterFailedRestart,
    setShowWakeCommandAfterFailedRestart,
  ] = useState(false);
  const shouldShowWakeShellCommand =
    isThisMac && (!canRequestRestart || showWakeCommandAfterFailedRestart);

  const restartOnThisMac = async (): Promise<void> => {
    setIsRestartingLocally(true);
    setLocalRestartMessage(null);
    setShowWakeCommandAfterFailedRestart(false);

    try {
      const result = await requestLocalAgentWitchRestartFromWakeServer();
      if (!result.reachable) {
        setShowWakeCommandAfterFailedRestart(true);
        setLocalRestartMessage(
          "The local wake server is not running (the computer client process may have stopped). Run wake.sh in Terminal on this computer.",
        );
        return;
      }

      setLocalRestartMessage(
        "Restart requested. This page should show Online within about 30 seconds.",
      );
      await refreshPairedDevices();
    } finally {
      setIsRestartingLocally(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <h2 className="pr-10 text-lg font-semibold text-awc-fg dark:text-white/90">
        {isThisMac
          ? "Start AgentWitch on this computer"
          : "Turn on this computer"}
      </h2>
      <MacDeviceWakeOfflineLede
        displayName={displayName}
        isThisMac={isThisMac}
      />
      {shouldShowWakeShellCommand ? <MacDeviceWakeShellCommandBlock /> : null}
      {isThisMac && canRequestRestart ? (
        <div className="mt-4">
          <Button
            disabled={isRestartingLocally}
            onClick={() => {
              void restartOnThisMac();
            }}
          >
            {isRestartingLocally
              ? "Restarting…"
              : "Restart AgentWitch on this computer"}
          </Button>
          {localRestartMessage !== null ? (
            <p className="mt-3 text-sm text-awc-fg-muted dark:text-gray-400">
              {localRestartMessage}
            </p>
          ) : null}
        </div>
      ) : null}
      {canRequestRestart ? (
        <button
          type="button"
          onClick={() => {
            void requestAgentWitchWake(deviceId);
          }}
          className="mt-4 text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Request restart when this computer reconnects
        </button>
      ) : null}
    </Modal>
  );
}
