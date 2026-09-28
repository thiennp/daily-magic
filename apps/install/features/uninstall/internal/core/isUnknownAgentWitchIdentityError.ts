import { AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE } from "@agent-witch/shared/protocol";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** True only for the cloud "this token is not in the device table" reply. */
export const isUnknownAgentWitchIdentityError = (
  message: Record<string, unknown>,
): boolean => {
  if (message.type !== "system.error" || !isRecord(message.payload)) {
    return false;
  }

  return message.payload.errorCode === AGENT_WITCH_UNKNOWN_IDENTITY_ERROR_CODE;
};
