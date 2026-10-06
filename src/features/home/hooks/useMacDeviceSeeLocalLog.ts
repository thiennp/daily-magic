"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import buildAgentWitchLocalLogHref from "@/features/agent-witch/macDevices/utils/buildAgentWitchLocalLogHref";

/** Opens the local log page for a device with a wake port (This computer). */
const useMacDeviceSeeLocalLog = (input: {
  readonly wakePort: number | null | undefined;
  readonly displayName: string;
}): (() => void) => {
  const router = useRouter();
  const { wakePort, displayName } = input;

  return useCallback(() => {
    if (wakePort === null || wakePort === undefined) {
      return;
    }
    router.push(buildAgentWitchLocalLogHref({ wakePort, displayName }));
  }, [wakePort, displayName, router]);
};

export default useMacDeviceSeeLocalLog;
