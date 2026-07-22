"use client";

import { useEffect } from "react";

import { isMacDispatchOfflineErrorMessage } from "@/features/agent/utils/isMacDispatchOfflineErrorMessage";
import type { AgentWitchSocketDisplay } from "@/lib/agentWitch/parseAgentWitchSocketDisplay";

export const useClearStaleMacDispatchError = (input: {
  readonly lastResponse: AgentWitchSocketDisplay;
  readonly clearLastResponse: () => void;
  readonly selectedDeviceCanDispatch: boolean;
  readonly isTeamDispatch: boolean;
}): void => {
  const {
    lastResponse,
    clearLastResponse,
    selectedDeviceCanDispatch,
    isTeamDispatch,
  } = input;

  useEffect(() => {
    if (
      isTeamDispatch ||
      !lastResponse.isError ||
      !selectedDeviceCanDispatch ||
      !isMacDispatchOfflineErrorMessage(lastResponse.text)
    ) {
      return;
    }

    clearLastResponse();
  }, [
    clearLastResponse,
    isTeamDispatch,
    lastResponse.isError,
    lastResponse.text,
    selectedDeviceCanDispatch,
  ]);
};
