export const readAgentOutputTextFromMessagePayload = (
  payload: Record<string, unknown> | undefined,
): string => {
  if (payload === undefined) {
    return "";
  }

  if (typeof payload.chunk === "string") {
    return payload.chunk;
  }

  if (typeof payload.output === "string") {
    return payload.output;
  }

  return "";
};
