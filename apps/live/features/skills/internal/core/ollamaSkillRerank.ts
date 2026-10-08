import type { SkillRerankCompleter } from "./skillRerank";

const RERANK_TIMEOUT_MS = 8_000;
const DEFAULT_MODEL = "qwen2.5:7b";

/** Local Ollama chat for the optional re-rank (flag-gated by the caller). */
export const createOllamaSkillRerank =
  (fetchFn: typeof fetch = fetch): SkillRerankCompleter =>
  async (prompt) => {
    try {
      const response = await fetchFn(
        `${process.env.AGENT_WITCH_OLLAMA_URL?.trim() || "http://127.0.0.1:11434"}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model:
              process.env.AGENT_WITCH_OLLAMA_CHAT_MODEL?.trim() ||
              DEFAULT_MODEL,
            stream: false,
            format: "json",
            options: { temperature: 0 },
            messages: [{ role: "user", content: prompt }],
          }),
          signal: AbortSignal.timeout(RERANK_TIMEOUT_MS),
        },
      );
      if (!response.ok) {
        return null;
      }
      const body = (await response.json()) as {
        message?: { content?: string };
      };
      return body.message?.content ?? null;
    } catch {
      return null;
    }
  };
