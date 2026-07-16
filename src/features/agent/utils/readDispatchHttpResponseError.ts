const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readDispatchHttpResponseError = (
  data: unknown,
  status: number,
): string => {
  if (!isRecord(data)) {
    return status > 0
      ? `Dispatch failed (HTTP ${status}).`
      : "Dispatch response was invalid.";
  }

  if (typeof data.errorMessage === "string" && data.errorMessage.length > 0) {
    return data.errorMessage;
  }

  if (data.error === "Unauthorized") {
    return "Please sign in again and retry.";
  }

  if (typeof data.error === "string" && data.error.length > 0) {
    return data.error;
  }

  return "Dispatch failed.";
};
