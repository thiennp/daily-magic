"use client";

import { useEffect, useState } from "react";

import { fetchAgentWitchInstallConnection } from "@/lib/agentWitch/fetchAgentWitchInstallConnection";
import { CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS } from "@/features/home/constants/connectInstallPasteModal.constant";

const useInstallConnectionStatus = (input: {
  readonly enabled: boolean;
}): {
  readonly isInstallConnectionFinished: boolean;
} => {
  const { enabled } = input;
  const [isInstallConnectionFinished, setIsInstallConnectionFinished] =
    useState(false);

  useEffect(() => {
    if (!enabled || isInstallConnectionFinished) {
      return;
    }

    const poll = { active: true };

    const checkConnection = async (): Promise<void> => {
      if (!poll.active) {
        return;
      }

      const status = await fetchAgentWitchInstallConnection().catch(() => ({
        ok: false as const,
        error: "Could not verify Mac connection.",
      }));

      if (poll.active && status.ok && status.finished === true) {
        setIsInstallConnectionFinished(true);
      }
    };

    const interval = window.setInterval(() => {
      void checkConnection();
    }, CONNECT_INSTALL_PASTE_MODAL_WAKE_POLL_MS);

    void checkConnection();

    return () => {
      poll.active = false;
      clearInterval(interval);
    };
  }, [enabled, isInstallConnectionFinished]);

  return { isInstallConnectionFinished };
};

export default useInstallConnectionStatus;
