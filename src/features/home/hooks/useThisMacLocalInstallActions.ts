"use client";

import { useCallback } from "react";

import confirmMacDeviceDeleteLocalInstall from "@/features/agent-witch/macDevices/utils/confirmMacDeviceDeleteLocalInstall";
import { requestLocalAgentWitchSelfUpdateFromWakeServer } from "@/features/agent-witch/utils/requestLocalAgentWitchSelfUpdateFromWakeServer";

const useThisMacLocalInstallActions = (): {
  readonly onUpdateLocal: () => void;
  readonly onDeleteLocalScript: () => void;
} => {
  const onUpdateLocal = useCallback(() => {
    void requestLocalAgentWitchSelfUpdateFromWakeServer().then((result) => {
      window.alert(result.message);
    });
  }, []);

  const onDeleteLocalScript = useCallback(() => {
    confirmMacDeviceDeleteLocalInstall();
  }, []);

  return { onUpdateLocal, onDeleteLocalScript };
};

export default useThisMacLocalInstallActions;
