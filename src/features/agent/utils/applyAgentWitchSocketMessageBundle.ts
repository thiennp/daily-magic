import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const applyAgentWitchSocketMessageBundle = (input: {
  readonly raw: string;
  readonly applyTerminalMessage: (raw: string) => void;
  readonly applyShellMessage: (raw: string) => void;
  readonly attachShellSession: (
    shellSessionId: string,
    canWrite: boolean,
  ) => void;
}): void => {
  input.applyTerminalMessage(input.raw);
  input.applyShellMessage(input.raw);
  try {
    const parsed: unknown = JSON.parse(input.raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("type" in parsed) ||
      (parsed as { type: string }).type !== AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK
    ) {
      return;
    }
    const payload = (parsed as { payload?: Record<string, unknown> }).payload;
    if (
      typeof payload?.shellSessionId === "string" &&
      payload.dispatched === true
    ) {
      input.attachShellSession(
        payload.shellSessionId,
        payload.shellCanWrite === true,
      );
    }
  } catch {
    // ignore
  }
};
