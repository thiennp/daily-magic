"use client";

import { useEffect } from "react";

import {
  CONNECT_INSTALL_PASTE_MODAL_AUTO_CLOSE_MS,
  CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS,
} from "@/features/home/constants/connectInstallPasteModal.constant";
import { isLocalAgentWitchWakeServerReachable } from "@/lib/agentWitch/isLocalAgentWitchWakeServerReachable";

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
      window.clearTimeout(timer);
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

    const checkLocalConnection = async (): Promise<void> => {
      if (!poll.active) {
        return;
      }

      const isReachable = await isLocalAgentWitchWakeServerReachable();
      if (poll.active && isReachable) {
        onClose();
      }
    };

    const interval = window.setInterval(() => {
      void checkLocalConnection();
    }, CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS);

    void checkLocalConnection();

    return () => {
      poll.active = false;
      window.clearInterval(interval);
    };
  }, [isOpen, onClose]);
};

export default useConnectInstallPasteModalDismissal;
