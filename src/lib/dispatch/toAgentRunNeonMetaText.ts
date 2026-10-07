/**
 * Neon holds agent_runs meta only — never full prompt/result bodies (Thien/
 * AW Lead HARD 2026-10-07). Cap body-capable text at write and shrink prompt
 * on terminal status so pending-approval restore still has the full prompt.
 */
export const AGENT_RUN_NEON_META_MAX_CHARS = 120;

/** Collapse whitespace and truncate to AGENT_RUN_NEON_META_MAX_CHARS. */
export const toAgentRunNeonMetaText = (text: string): string => {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= AGENT_RUN_NEON_META_MAX_CHARS) {
    return collapsed;
  }
  return `${collapsed.slice(0, AGENT_RUN_NEON_META_MAX_CHARS - 1)}…`;
};
