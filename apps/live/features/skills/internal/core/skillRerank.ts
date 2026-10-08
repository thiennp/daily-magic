import type { SkillHit } from "./skillIndex.types";

export const SKILL_RERANK_TOP = 8;

/** Plain-text completion (Ollama chat); null on any failure. */
export type SkillRerankCompleter = (prompt: string) => Promise<string | null>;

export const isSkillRerankEnabled = (
  env: NodeJS.ProcessEnv = process.env,
): boolean => env.AGENT_WITCH_SKILLS_RERANK === "1";

const buildPrompt = (query: string, hits: readonly SkillHit[]): string =>
  [
    "Order these skills by how well they fit the task, best first.",
    'Answer ONLY strict JSON: {"order":["<skillId>", ...]}',
    `TASK: ${query.slice(0, 500)}`,
    ...hits.map((h) => `- ${h.skillId}: ${h.name} - ${h.description}`),
  ].join("\n");

/**
 * Re-rank the top candidates with a local model. Unknown ids are ignored,
 * missing ids keep their order after the ranked ones; any failure keeps the
 * fused order.
 */
export const rerankSkillHits = async (
  query: string,
  hits: readonly SkillHit[],
  complete: SkillRerankCompleter,
): Promise<readonly SkillHit[]> => {
  const head = hits.slice(0, SKILL_RERANK_TOP);
  if (head.length < 2) {
    return hits;
  }
  try {
    const text = (await complete(buildPrompt(query, head))) ?? "";
    const order = (
      JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) as {
        order?: unknown;
      }
    ).order;
    if (!Array.isArray(order)) {
      return hits;
    }
    const byId = new Map(head.map((h) => [h.skillId, h] as const));
    const ranked = order
      .map((id) => byId.get(String(id)))
      .filter((h): h is SkillHit => h !== undefined);
    const rest = head.filter((h) => !ranked.includes(h));
    return [...new Set([...ranked, ...rest]), ...hits.slice(SKILL_RERANK_TOP)];
  } catch {
    return hits;
  }
};
