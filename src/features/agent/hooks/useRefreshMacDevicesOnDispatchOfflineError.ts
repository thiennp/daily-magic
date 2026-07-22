"use client";

import { useEffect } from "react";

import { isMacDispatchOfflineErrorMessage } from "@/features/agent/utils/isMacDispatchOfflineErrorMessage";
import type { AgentWitchSocketDisplay } from "@/lib/agentWitch/parseAgentWitchSocketDisplay";

export const useRefreshMacDevicesOnDispatchOfflineError = (input: {
  readonly lastResponse: AgentWitchSocketDisplay;
  readonly refreshMacDevices: () => Promise<void>;
}): void => {
  const { lastResponse, refreshMacDevices } = input;

  useEffect(() => {
    if (
      !lastResponse.isError ||
      !isMacDispatchOfflineErrorMessage(lastResponse.text)
    ) {
      return;
    }

    void refreshMacDevices();
  }, [lastResponse.isError, lastResponse.text, refreshMacDevices]);
};
