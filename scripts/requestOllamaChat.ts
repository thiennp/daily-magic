const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const CHAT_REQUEST_TIMEOUT_MS = 120_000;

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

/** One Ollama chat reply for Prompt optimizer. Null when Ollama is down or the model is missing. */
export const requestOllamaChat = async (input: {
  readonly model: string;
  readonly prompt: string;
}): Promise<string | null> => {
  const model = input.model.trim();
  if (model.length === 0 || input.prompt.trim().length === 0) {
    return null;
  }

  const baseUrl =
    process.env.AGENT_WITCH_OLLAMA_URL?.trim() || DEFAULT_OLLAMA_URL;

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [{ role: "user", content: input.prompt }],
        options: { temperature: 0, num_predict: 1200 },
      }),
      signal: AbortSignal.timeout(CHAT_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return null;
    }

    return readOllamaMessageContent(await response.json());
  } catch {
    return null;
  }
};
