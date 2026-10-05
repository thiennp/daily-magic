import {
  resolveAgentWitchCloudApiConfig,
  type AgentWitchCloudApiConfig,
} from "../../../projects/internal/core/agentWitchCloudApi";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";

import { writeLocalProjectHistoryState } from "./localProjectHistoryState";
import { postProjectMessageComputerAck } from "./postProjectMessageComputerAck";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

const LOG_PREFIX = "[project-history-dispatch]";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export type HandleProjectMessageHistoryDispatchResult =
  | { readonly ok: true; readonly messageId: string; readonly acked: boolean }
  | { readonly ok: false; readonly reason: string };

const resolveCloudApi = (): AgentWitchCloudApiConfig | null => {
  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return null;
  }
  return resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });
};

/**
 * AWL inbound handler for `project.message.history`.
 * Sends computerAck only after the durable write succeeds.
 * On write failure: no ack; marks the project degraded.
 */
export const handleProjectMessageHistoryDispatch = async (input: {
  readonly payload: unknown;
  readonly cloudApi?: AgentWitchCloudApiConfig | null;
}): Promise<HandleProjectMessageHistoryDispatchResult> => {
  if (!isRecord(input.payload)) {
    return { ok: false, reason: "invalid_payload" };
  }
  const projectId =
    typeof input.payload.projectId === "string"
      ? input.payload.projectId.trim()
      : "";
  const messageRaw = input.payload.message;
  if (projectId.length === 0 || !isRecord(messageRaw)) {
    return { ok: false, reason: "invalid_payload" };
  }
  const messageId =
    typeof messageRaw.messageId === "string" ? messageRaw.messageId.trim() : "";
  if (messageId.length === 0) {
    return { ok: false, reason: "missing_message_id" };
  }

  try {
    writeProjectHistoryMessage({
      projectId,
      messageId,
      message: messageRaw,
    });
    writeLocalProjectHistoryState({ projectId, state: "on_ready" });
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "write_failed", projectId, messageId, error);
    try {
      writeLocalProjectHistoryState({ projectId, state: "degraded" });
    } catch (stateError: unknown) {
      console.error(LOG_PREFIX, "degraded_mark_failed", projectId, stateError);
    }
    return { ok: false, reason: "write_failed" };
  }

  const cloudApi =
    input.cloudApi === undefined ? resolveCloudApi() : input.cloudApi;
  if (cloudApi === null) {
    console.error(LOG_PREFIX, "ack_skipped_no_cloud_api", projectId, messageId);
    return { ok: true, messageId, acked: false };
  }

  try {
    const ack = await postProjectMessageComputerAck({
      cloudApi,
      projectId,
      messageId,
    });
    if (!ack.ok) {
      console.error(LOG_PREFIX, "ack_http_failed", projectId, messageId, ack.status);
      return { ok: true, messageId, acked: false };
    }
    return { ok: true, messageId, acked: true };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "ack_failed", projectId, messageId, error);
    return { ok: true, messageId, acked: false };
  }
};
