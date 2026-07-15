import { parseHarnessExportResultPayload } from "@/lib/harness/types/HarnessExportResult.type";
import { applyHarnessExportSetsToDevice } from "@/lib/harness/applyHarnessExportSetsToDevice";
import { completeHarnessExportRequest } from "@/lib/harness/harnessExportRequestRegistry";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const handleHarnessExportResultMessage = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Only agent clients can publish export results.",
      },
      requestId: message.requestId,
    };
  }

  const borrowerUserId =
    typeof message.payload?.borrowerUserId === "string"
      ? message.payload.borrowerUserId
      : "";

  if (borrowerUserId.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "harness.export.result requires payload.borrowerUserId.",
      },
      requestId: message.requestId,
    };
  }

  const targetDeviceId =
    typeof message.payload?.targetDeviceId === "string" &&
    message.payload.targetDeviceId.length > 0
      ? message.payload.targetDeviceId
      : undefined;
  const exportResult = parseHarnessExportResultPayload(message.payload);

  completeHarnessExportRequest(message.requestId, message.payload);

  if (
    targetDeviceId !== undefined &&
    exportResult?.success === true &&
    exportResult.sets !== undefined
  ) {
    applyHarnessExportSetsToDevice(
      runtime,
      borrowerUserId,
      targetDeviceId,
      exportResult.sets,
    );
  }

  runtime.broadcastToDashboardUser(borrowerUserId, message);
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
