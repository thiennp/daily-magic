import type { CursorCloudConnectionSummary } from "@/lib/cursorCloud/types/CursorCloudConnection.type";

export const emptyCursorCloudConnectionSummary =
  (): CursorCloudConnectionSummary => ({
    connected: false,
    apiKeyName: null,
    cursorUserEmail: null,
    connectedAt: null,
  });

export const parseCursorCloudConnectionSummary = (
  body: unknown,
): CursorCloudConnectionSummary => {
  if (
    typeof body === "object" &&
    body !== null &&
    "connected" in body &&
    typeof (body as { connected: unknown }).connected === "boolean"
  ) {
    return body as CursorCloudConnectionSummary;
  }

  return emptyCursorCloudConnectionSummary();
};

export const readCursorCloudConnectionError = (body: unknown): string =>
  typeof body === "object" &&
  body !== null &&
  "error" in body &&
  typeof (body as { error: unknown }).error === "string"
    ? (body as { error: string }).error
    : "Could not connect Cursor Cloud.";
