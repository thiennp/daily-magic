const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_ESTIMATE_MODEL = "qwen2.5:7b";
const ESTIMATE_REQUEST_TIMEOUT_MS = 45_000;

const readOllamaMessageContent = (body: unknown): string | null => {
  if (typeof body !== "object" || body === null || !("message" in body)) {
    return null;
  }

  const message = (body as { message: unknown }).message;
  if (
    typeof message !== "object" ||
    message === null ||
    !("content" in message)
  ) {
    return null;
  }

  const content = (message as { content: unknown }).content;
  if (typeof content !== "string" || content.trim().length === 0) {
    return null;
  }

  return content;
};

/** Non-streaming Ollama chat for the estimate sidecar. Null when Ollama is down or the model is missing. */
export const requestOllamaTaskEstimate = async (
  prompt: string,
): Promise<string | null> => {
  const baseUrl =
    process.env.AGENT_WITCH_OLLAMA_URL?.trim() || DEFAULT_OLLAMA_URL;
  const model =
    process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim() || DEFAULT_ESTIMATE_MODEL;

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [{ role: "user", content: prompt }],
        options: { temperature: 0, num_predict: 80 },
      }),
      signal: AbortSignal.timeout(ESTIMATE_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return null;
    }

    return readOllamaMessageContent(await response.json());
  } catch {
    return null;
  }
};
