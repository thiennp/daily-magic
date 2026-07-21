"use client";

import { useSearchParams } from "next/navigation";

import {
  SEND_TASK_CONTINUE_SESSION_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_VALUE,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM,
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { hasPersistedInProgressAgentLiveTerminalSession } from "@/features/agent/utils/hasPersistedInProgressAgentLiveTerminalSession";
import { resolveShouldRestoreAgentLiveTerminalSession } from "@/features/agent/utils/resolveShouldRestoreAgentLiveTerminalSession";

export const useSendTaskModalUrlFlags = (): {
  readonly urlWantsOpen: boolean;
  readonly shouldRestoreLiveSession: boolean;
  readonly capabilityFromUrl: string;
  readonly sourceRunId: string;
} => {
  const searchParams = useSearchParams();
  const sourceRunId =
    searchParams.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "";
  const hasPersistedInProgressSession =
    hasPersistedInProgressAgentLiveTerminalSession();
  return {
    urlWantsOpen:
      searchParams.get(SEND_TASK_MODAL_QUERY_PARAM) ===
      SEND_TASK_MODAL_QUERY_VALUE,
    shouldRestoreLiveSession: resolveShouldRestoreAgentLiveTerminalSession({
      continueSession:
        searchParams.get(SEND_TASK_CONTINUE_SESSION_QUERY_PARAM) === "1",
      resumeLiveSession:
        searchParams.get(SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM) === "1",
      sourceRunId,
      hasPersistedInProgressSession,
    }),
    capabilityFromUrl: searchParams.get("libraryCapabilityId") ?? "custom",
    sourceRunId,
  };
};
