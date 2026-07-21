import { CURSOR_CLOUD_API_BASE_URL } from "@/lib/cursorCloud/cursorCloudApiBaseUrl.constant";

export interface CursorCloudApiKeyInfo {
  readonly apiKeyName: string | null;
  readonly cursorUserEmail: string | null;
}

const readOptionalString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

export const fetchCursorCloudApiKeyInfo = async (
  apiKey: string,
): Promise<CursorCloudApiKeyInfo | null> => {
  const response = await fetch(`${CURSOR_CLOUD_API_BASE_URL}/v1/me`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    return null;
  }

  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as {
    apiKeyName?: unknown;
    userEmail?: unknown;
  };

  return {
    apiKeyName: readOptionalString(record.apiKeyName),
    cursorUserEmail: readOptionalString(record.userEmail),
  };
};
