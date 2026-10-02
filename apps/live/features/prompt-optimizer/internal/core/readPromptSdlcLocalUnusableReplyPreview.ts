import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcStoredWriterReplyText } from "./readPromptSdlcWriterOutput";

export const PROMPT_SDLC_LOCAL_REPLY_PREVIEW_MAX = 400;

export const truncatePromptSdlcLocalReplyPreview = (
  text: string,
  maxLength: number = PROMPT_SDLC_LOCAL_REPLY_PREVIEW_MAX,
): string => {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength)}…`;
};

const readRevisionReplyText = (
  revision: PromptSdlcLocalCycle["revisions"][number],
): string | null => {
  const rawReply = revision.judgement?.rawReply?.trim() ?? "";
  if (rawReply.length > 0) {
    return rawReply;
  }
  return readPromptSdlcStoredWriterReplyText(revision.promptText);
};

/** Last writer/judge output when a terminal reply could not be parsed or used. */
export const readPromptSdlcLocalUnusableReplyPreview = (
  cycle: PromptSdlcLocalCycle,
): string | null => {
  const wizardReply = cycle.wizard?.lastWriterParseFailureReply?.trim() ?? "";
  if (wizardReply.length > 0) {
    return wizardReply;
  }
  const byRound = cycle.revisions.find(
    (revision) => revision.roundNumber === cycle.currentRound,
  );
  const fromCurrent =
    byRound === undefined ? null : readRevisionReplyText(byRound);
  if (fromCurrent !== null) {
    return fromCurrent.trim();
  }
  for (let index = cycle.revisions.length - 1; index >= 0; index -= 1) {
    const text = readRevisionReplyText(cycle.revisions[index]);
    if (text !== null) {
      return text.trim();
    }
  }
  return null;
};
