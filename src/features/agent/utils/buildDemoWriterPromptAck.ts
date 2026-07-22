import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export function buildDemoClaudePromptAck(): string {
  return JSON.stringify(
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: {
        message: "Demo preview — task was not sent.",
      },
    },
    null,
    2,
  );
}
