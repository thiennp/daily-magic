"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { revokePairedDevice } from "@/features/agent-witch/utils/pairedDevicesApi";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

const useHomeConnectedMacDeviceActions = () => {
  const router = useRouter();

  const onDelegateTask = useCallback(
    (deviceId: string) => {
      router.push(buildAgentComposerHref({ deviceId }), { scroll: false });
    },
    [router],
  );

  const onOpenShell = useCallback(
    (deviceId: string) => {
      router.push(buildAgentComposerHref({ deviceId, openShell: true }), {
        scroll: false,
      });
    },
    [router],
  );

  const onDelete = useCallback(async (deviceId: string) => {
    await revokePairedDevice(deviceId);
  }, []);

  return { onDelegateTask, onOpenShell, onDelete };
};

export default useHomeConnectedMacDeviceActions;
