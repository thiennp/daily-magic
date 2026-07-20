"use client";

import { useEffect } from "react";

import {
  CONNECT_INSTALL_PASTE_MODAL_AUTO_CLOSE_MS,
  CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS,
} from "@/features/home/constants/connectInstallPasteModal.constant";
import { fetchAgentWitchInstallConnection } from "@/lib/agentWitch/fetchAgentWitchInstallConnection";

const useConnectInstallPasteModalDismissal = ({
  isOpen,
  isLinking,
  onClose,
}: {
  readonly isOpen: boolean;
  readonly isLinking: boolean;
  readonly onClose: () => void;
}): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, CONNECT_INSTALL_PASTE_MODAL_AUTO_CLOSE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && isLinking) {
      onClose();
    }
  }, [isOpen, isLinking, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const poll = { active: true };

    const checkBridgeConnection = async (): Promise<void> => {
      if (!poll.active) {
        return;
      }

      const status = await fetchAgentWitchInstallConnection().catch(() => ({
        ok: false as const,
        error: "Could not verify Mac connection.",
      }));

      if (poll.active && status.ok && status.finished === true) {
        onClose();
      }
    };

    const interval = window.setInterval(() => {
      void checkBridgeConnection();
    }, CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS);

    void checkBridgeConnection();

    return () => {
      poll.active = false;
      clearInterval(interval);
    };
  }, [isOpen, onClose]);
};

export default useConnectInstallPasteModalDismissal;
