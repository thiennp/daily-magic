import { AGENT_WITCH_DEVICE_NOT_LINKED_ERROR_CODE } from "@agent-witch/shared/protocol";

const NOT_LINKED_MESSAGE_FRAGMENT = "identity is not linked";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Cloud knows this token but the device is revoked or unlinked. Older servers
 * send only the message, so the text is matched as a fallback.
 */
export const isDeviceNotLinkedError = (
  message: Record<string, unknown>,
): boolean => {
  if (message.type !== "system.error" || !isRecord(message.payload)) {
    return false;
  }
  const { errorCode, errorMessage } = message.payload;
  return (
    errorCode === AGENT_WITCH_DEVICE_NOT_LINKED_ERROR_CODE ||
    (typeof errorMessage === "string" &&
      errorMessage.includes(NOT_LINKED_MESSAGE_FRAGMENT))
  );
};
