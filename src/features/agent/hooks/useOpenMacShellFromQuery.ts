"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import {
  SEND_TASK_DEVICE_ID_QUERY_PARAM,
  SEND_TASK_OPEN_SHELL_QUERY_PARAM,
  SEND_TASK_OPEN_SHELL_QUERY_VALUE,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";

export const useOpenMacShellFromQuery = (input: {
  readonly connectionStatus: ReturnType<
    typeof useAgentWitchSocket
  >["connectionStatus"];
  readonly openShell: ReturnType<
    typeof useAgentWitchSocket
  >["macShell"]["openShell"];
}): void => {
  const searchParams = useSearchParams();
  const openedRef = useRef(false);

  useEffect(() => {
    if (openedRef.current) {
      return;
    }
    if (input.connectionStatus !== "connected") {
      return;
    }
    if (
      searchParams.get(SEND_TASK_OPEN_SHELL_QUERY_PARAM) !==
      SEND_TASK_OPEN_SHELL_QUERY_VALUE
    ) {
      return;
    }
    const deviceId = searchParams.get(SEND_TASK_DEVICE_ID_QUERY_PARAM) ?? "";
    openedRef.current = true;
    input.openShell(deviceId.length > 0 ? deviceId : undefined);
  }, [input, searchParams]);
};
