/** P1-S4b @ composer: pure mention helpers (no backend fields — names only). */
export type OneWindowMentionAssistant = {
  readonly membershipId: string;
  readonly displayName: string;
};

/** "You can @ up to 5 … Each gets its own task." */
export const ONE_WINDOW_MENTION_CAP = 5;

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Assistants @-mentioned in `text` (case-insensitive "@Name" followed by a
 * space, punctuation or the end), in order of first mention, unique, capped.
 */
export const parseOneWindowMentions = (
  text: string,
  assistants: readonly OneWindowMentionAssistant[],
): readonly string[] =>
  assistants
    .map((assistant) => {
      const name = assistant.displayName.trim();
      if (name.length === 0) return { id: assistant.membershipId, at: -1 };
      const pattern = new RegExp(`(^|\\s)@${escapeRegExp(name)}(?=$|[\\s.,!?;:)])`, "i");
      const match = pattern.exec(text);
      return { id: assistant.membershipId, at: match === null ? -1 : match.index };
    })
    .filter((hit) => hit.at >= 0)
    .sort((a, b) => a.at - b.at)
    .map((hit) => hit.id)
    .slice(0, ONE_WINDOW_MENTION_CAP);

/** The "@query" being typed right before the caret, or null. */
export const activeOneWindowMentionQuery = (text: string, caret: number): string | null => {
  const match = /(^|\s)@([^\s@]*)$/.exec(text.slice(0, caret));
  return match === null ? null : match[2];
};

/** Assistants whose name starts with the query (case-insensitive). */
export const filterOneWindowMentionOptions = (
  assistants: readonly OneWindowMentionAssistant[],
  query: string,
): readonly OneWindowMentionAssistant[] => {
  const q = query.toLowerCase();
  return assistants.filter((a) => a.displayName.toLowerCase().startsWith(q));
};

/** Replace the "@query" before the caret with "@Name " → next text + caret. */
export const applyOneWindowMention = (
  text: string,
  caret: number,
  name: string,
): { readonly text: string; readonly caret: number } => {
  const before = text.slice(0, caret).replace(/@([^\s@]*)$/, `@${name} `);
  return { text: before + text.slice(caret), caret: before.length };
};
