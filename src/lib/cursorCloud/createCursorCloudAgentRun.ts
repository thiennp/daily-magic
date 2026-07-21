import { CURSOR_CLOUD_API_BASE_URL } from "@/lib/cursorCloud/cursorCloudApiBaseUrl.constant";

export interface CreatedCursorCloudAgent {
  readonly agentId: string;
  readonly runId: string;
  readonly agentUrl: string | null;
  readonly runStatus: string;
}

const readString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

export const createCursorCloudAgentRun = async (input: {
  readonly apiKey: string;
  readonly prompt: string;
}): Promise<CreatedCursorCloudAgent | null> => {
  const response = await fetch(`${CURSOR_CLOUD_API_BASE_URL}/v1/agents`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${input.apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: { text: input.prompt },
      env: { type: "cloud" },
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    return null;
  }

  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as {
    agent?: { id?: unknown; url?: unknown };
    run?: { id?: unknown; status?: unknown };
  };

  const agentId = readString(record.agent?.id);
  const runId = readString(record.run?.id);
  if (agentId === null || runId === null) {
    return null;
  }

  return {
    agentId,
    runId,
    agentUrl: readString(record.agent?.url),
    runStatus: readString(record.run?.status) ?? "CREATING",
  };
};
