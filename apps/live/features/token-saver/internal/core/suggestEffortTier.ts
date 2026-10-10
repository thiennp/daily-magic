import {
  decideEffortTier,
  type EffortTier,
} from "@agent-witch/shared/taskRefinement";

const DEFAULT_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5:7b";
const TIMEOUT_MS = 2500;
const AGENT_TIERS = ["low", "medium", "high"] as const;

export type EffortSuggestion = {
  readonly tier: EffortTier;
  readonly source: "skill" | "ollama" | "heuristic";
};

export type OllamaTierChat = (title: string) => Promise<string | null>;

/** One short JSON chat to local Ollama; null on any failure (never throws). */
export const chatOllamaForTier: OllamaTierChat = async (title) => {
  const base = process.env.AGENT_WITCH_OLLAMA_URL?.trim() || DEFAULT_URL;
  const model =
    process.env.AGENT_WITCH_OLLAMA_CHAT_MODEL?.trim() || DEFAULT_MODEL;
  try {
    const response = await fetch(`${base}/api/chat`, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        options: { temperature: 0 },
        messages: [
          {
            role: "system",
            content:
              'Pick the cheapest effort that can do the task: "low" (simple, mechanical), "medium" (build or change code), "high" (open-ended, design, debugging). Reply JSON {"tier":"low|medium|high"}.',
          },
          { role: "user", content: title },
        ],
      }),
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { message?: { content?: string } };
    return body.message?.content ?? null;
  } catch {
    return null;
  }
};

const parseTier = (raw: string | null): EffortTier | null => {
  try {
    const tier = (JSON.parse(raw ?? "") as { tier?: unknown }).tier;
    return (AGENT_TIERS as readonly unknown[]).includes(tier)
      ? (tier as EffortTier)
      : null;
  } catch {
    return null;
  }
};

/**
 * Cheapest effort for a subtask: a matching skill needs no agent; otherwise ask
 * local Ollama, and fall back to the title heuristic when it is missing, slow
 * or answers nonsense.
 */
export const suggestEffortTier = async (input: {
  readonly title: string;
  readonly hasSkill: boolean;
  readonly chat?: OllamaTierChat;
}): Promise<EffortSuggestion> => {
  if (input.hasSkill) return { tier: "script", source: "skill" };
  const tier = parseTier(await (input.chat ?? chatOllamaForTier)(input.title));
  return tier !== null
    ? { tier, source: "ollama" }
    : {
        tier: decideEffortTier({ title: input.title, hasSkillScript: false }),
        source: "heuristic",
      };
};
