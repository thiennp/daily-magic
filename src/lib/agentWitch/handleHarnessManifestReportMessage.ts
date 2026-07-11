import isRecord from "./isRecord";
import { unauthorizedAgentOnlyError } from "./agentWitchHubClientOperations";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type { AgentWitchHarnessManifestReport } from "./types/AgentWitchHubStatus.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const handleHarnessManifestReportMessage = (
  runtime: AgentWitchHubRuntime,
  senderId: string,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  const payload = message.payload;
  if (
    payload === undefined ||
    !isRecord(payload.manifest) ||
    typeof payload.hostname !== "string"
  ) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "harness.manifest.report requires payload.hostname and payload.manifest.",
      },
      requestId: message.requestId,
    };
  }

  const report: AgentWitchHarnessManifestReport = {
    agentClientId: senderId,
    hostname: payload.hostname,
    manifest: payload.manifest,
    reportedAt: new Date().toISOString(),
    userId: sender.userId,
  };
  runtime.manifestByAgentClientId.set(senderId, report);
  if (sender.pairingToken !== undefined) {
    void runtime.pairingStore.touchLastSeen(
      sender.pairingToken,
      payload.hostname,
    );
  }
  runtime.broadcastToDashboardUser(sender.userId, message);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
