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
 * (it was cut to "Changed: 2…"). The head keeps its first sentence whole when
 * that fits, else it is cut at a word boundary (it was cut to "Vali…").
 */
const clipHead = (head: string, room: number): string => {
  const firstSentence = head.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? head;
  if (firstSentence.length <= room) {
    return firstSentence;
  }
  const cut = head.slice(0, room + 1);
  const atWord = cut.lastIndexOf(" ");
  const clipped =
    atWord >= MIN_HEAD_CHARS ? cut.slice(0, atWord) : cut.slice(0, room);
  return `${clipped.replace(/[\s:;,.-]+$/, "")}…`;
};

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
  return `${clipHead(head, room)} ${tail}`;
};
