import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { markOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentStore";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const trackOnboardingFromAgentWitchSocketMessage = (raw: string): void => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.type !== AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK
    ) {
      return;
    }

    const payload = isRecord(parsed.payload) ? parsed.payload : null;
    if (payload === null) {
      return;
    }

    const agentRunId =
      typeof payload.agentRunId === "string" ? payload.agentRunId : "";
    const taskWasSent =
      payload.dispatched === true || payload.pendingApproval === true;

    if (agentRunId.length > 0 && taskWasSent) {
      markOnboardingFirstTaskSent();
    }
  } catch {
    return;
  }
};

export default trackOnboardingFromAgentWitchSocketMessage;
