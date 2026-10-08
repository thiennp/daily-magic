import {
  AGENT_RUN_NEON_META_MAX_CHARS,
  toAgentRunNeonMetaText,
} from "@/lib/dispatch/toAgentRunNeonMetaText";

const CHANGED_MARKER = "Changed: ";
const MIN_HEAD_CHARS = 12;

/**
 * f4bf6a0c: a Done summary is "<what the agent did>. Changed: 2 files
 * changed, 749 insertions(+), …". Neon meta stays ≤120 chars, so when it is
 * too long the head is clipped and the "Changed: …" line is kept whole
 * (it was cut to "Changed: 2…").
 */
export const toAgentRunReportSummaryMetaText = (text: string): string => {
  const collapsed = text.replace(/\s+/g, " ").trim();
  const changedAt = collapsed.lastIndexOf(CHANGED_MARKER);
  if (collapsed.length <= AGENT_RUN_NEON_META_MAX_CHARS || changedAt < 0) {
    return toAgentRunNeonMetaText(collapsed);
  }
  const tail = collapsed.slice(changedAt);
  if (tail.length > AGENT_RUN_NEON_META_MAX_CHARS) {
    return toAgentRunNeonMetaText(collapsed);
  }
  const room = AGENT_RUN_NEON_META_MAX_CHARS - tail.length - 2;
  const head = collapsed.slice(0, changedAt).trim();
  if (room < MIN_HEAD_CHARS || head.length === 0) {
    return tail;
  }
  return `${head.slice(0, room).trimEnd()}… ${tail}`;
};
