import { parseHarnessExportResultPayload } from "@/lib/harness/types/HarnessExportResult.type";
import { applyHarnessExportSetsToDevice } from "@/lib/harness/applyHarnessExportSetsToDevice";
import {
  completeHarnessExportRequest,
  peekHarnessExportParties,
} from "@/lib/harness/harnessExportRequestRegistry";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const handleHarnessExportResultMessage = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Only agent clients can publish export results.",
      },
      requestId: message.requestId,
    };
  }

  // Only the lender's agent may answer a request that is really pending; the borrower is
  // the one recorded at request time, never what the sender claims.
  const parties = peekHarnessExportParties(message.requestId);
  if (parties === undefined || parties.lenderUserId !== sender.userId) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "No matching harness export request." },
      requestId: message.requestId,
    };
  }
  const { borrowerUserId } = parties;

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
    await applyHarnessExportSetsToDevice(
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
