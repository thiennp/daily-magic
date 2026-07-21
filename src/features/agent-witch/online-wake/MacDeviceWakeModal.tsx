"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { refreshPairedDevices } from "@/features/agent-witch/pairedDevicesResource";
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

  const restartOnThisMac = async (): Promise<void> => {
    setIsRestartingLocally(true);
    setLocalRestartMessage(null);

    try {
      const result = await requestLocalAgentWitchRestartFromWakeServer();
      if (!result.reachable) {
        setLocalRestartMessage(
          "Could not reach the local wake server. Run Update local from the menu on this Mac.",
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
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        {isThisMac ? "Reconnect this Mac" : "Turn on this Mac"}
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        {isThisMac
          ? `${displayName} is offline in Agent Witch. The background agent may have stopped after an update. Restart it on this Mac, or wait for the next check-in.`
          : `${displayName} is offline. Power it on and wait for Agent Witch to reconnect at login. If the app is not installed yet, download it from Home on that Mac.`}
      </p>
      {isThisMac ? (
        <div className="mt-4">
          <Button
            disabled={isRestartingLocally}
            onClick={() => {
              void restartOnThisMac();
            }}
          >
            {isRestartingLocally
              ? "Restarting…"
              : "Restart Agent Witch on this Mac"}
          </Button>
          {localRestartMessage !== null ? (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
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
          Request restart when this Mac reconnects
        </button>
      ) : null}
    </Modal>
  );
}
