import { selectInstalledOllamaEstimateModel } from "../../../../adapters/writerDispatch";

import type { AutoSkillCompleter } from "./autoSkill.types";

type FetchFn = typeof fetch;

const baseUrl = (): string =>
  process.env.AGENT_WITCH_OLLAMA_URL?.trim() || "http://127.0.0.1:11434";

/** Installed chat model on the local Ollama, or null (down / embeddings only). */
export const probeAutoSkillOllamaModel = async (
  fetchFn: FetchFn = fetch,
): Promise<string | null> => {
  try {
    const response = await fetchFn(`${baseUrl()}/api/tags`, {
      signal: AbortSignal.timeout(2_000),
    });
    if (!response.ok) {
      return null;
    }
    const body = (await response.json()) as { models?: { name?: string }[] };
    const names = (body.models ?? [])
      .map((m) => m.name ?? "")
      .filter((name) => name.length > 0);
    return selectInstalledOllamaEstimateModel(
      names,
      process.env.AGENT_WITCH_OLLAMA_CHAT_MODEL?.trim() || null,
    );
  } catch {
    return null;
  }
};

/** Ollama /api/chat: temperature 0, strict JSON when `json`, short timeout. */
export const createOllamaAutoSkillCompleter =
  (model: string, fetchFn: FetchFn = fetch): AutoSkillCompleter =>
  async ({ prompt, json, timeoutMs }) => {
    try {
      const response = await fetchFn(`${baseUrl()}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: false,
          ...(json ? { format: "json" } : {}),
          options: { temperature: 0 },
          messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) {
        return { ok: false, reason: `ollama_http_${response.status}` };
      }
      const body = (await response.json()) as {
        message?: { content?: string };
      };
      const text = body.message?.content ?? "";
      return text.trim().length > 0
        ? { ok: true, text }
        : { ok: false, reason: "ollama_empty" };
    } catch {
      return { ok: false, reason: "ollama_unreachable" };
    }
  };
