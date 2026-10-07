import { parseProjectPageHash } from "@/features/projects/utils/parseProjectPageHash";

/** Hash tabs that open the Chat dock full view (`#chat`, retired `#activity`). */
const CHAT_HASH_TABS: readonly string[] = ["chat", "activity"];

/**
 * P1-S1: `#chat?mode=task` (New task) and old `#activity…` bookmarks open
 * the Chat dock full view now that the Activity tab is gone.
 */
export const isProjectChatHash = (hash: string): boolean =>
  CHAT_HASH_TABS.includes(parseProjectPageHash(hash).tab);
