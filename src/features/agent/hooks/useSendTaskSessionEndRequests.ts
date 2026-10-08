"use client";

import { usePickAnotherWriterRequest } from "@/features/agent/hooks/usePickAnotherWriterRequest";
import { useWindowEventRequest } from "@/features/agent/hooks/useWindowEventRequest";
import {
  AGENT_WITCH_CLOSE_SEND_TASK_EVENT,
  AGENT_WITCH_END_SEND_TASK_SESSION_EVENT,
} from "@/features/agent/utils/sendTaskSessionEvents";

/**
 * ed42d8ce: "End session" always ends the session. Close ends a session that
 * is not running anything (S11: a live run keeps going after Close), so an
 * ended session no longer comes back and pins New task to its computer.
 */
export const useSendTaskSessionEndRequests = (input: {
  readonly isSessionLive: boolean;
  readonly finishSession: () => void;
  readonly onPickAnotherWriter: () => void;
}): void => {
  usePickAnotherWriterRequest(() => {
    input.finishSession();
    input.onPickAnotherWriter();
  });
  useWindowEventRequest(AGENT_WITCH_END_SEND_TASK_SESSION_EVENT, () => {
    input.finishSession();
  });
  useWindowEventRequest(AGENT_WITCH_CLOSE_SEND_TASK_EVENT, () => {
    if (!input.isSessionLive) {
      input.finishSession();
    }
  });
};
