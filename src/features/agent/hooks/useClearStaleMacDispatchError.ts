"use client";

import { useEffect } from "react";

import { useClearSessionErrorOnNavigate } from "@/features/agent/hooks/useClearSessionErrorOnNavigate";
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
  useClearSessionErrorOnNavigate({
    isError: lastResponse.isError,
    clearLastResponse,
  });

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
