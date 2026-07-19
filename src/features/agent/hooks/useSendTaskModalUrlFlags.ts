"use client";

import { useSearchParams } from "next/navigation";

import {
  SEND_TASK_CONTINUE_SESSION_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_VALUE,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { resolveShouldRestoreAgentLiveTerminalSession } from "@/features/agent/utils/resolveShouldRestoreAgentLiveTerminalSession";

export const useSendTaskModalUrlFlags = (): {
  readonly urlWantsOpen: boolean;
  readonly shouldRestoreLiveSession: boolean;
  readonly capabilityFromUrl: string;
} => {
  const searchParams = useSearchParams();
  return {
    urlWantsOpen:
      searchParams.get(SEND_TASK_MODAL_QUERY_PARAM) ===
      SEND_TASK_MODAL_QUERY_VALUE,
    shouldRestoreLiveSession: resolveShouldRestoreAgentLiveTerminalSession({
      continueSession:
        searchParams.get(SEND_TASK_CONTINUE_SESSION_QUERY_PARAM) === "1",
      resumeLiveSession:
        searchParams.get(SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM) === "1",
    }),
    capabilityFromUrl: searchParams.get("libraryCapabilityId") ?? "custom",
  };
};
