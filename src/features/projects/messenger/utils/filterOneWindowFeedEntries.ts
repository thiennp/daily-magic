import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** DF-023: bot↔bot line (owner view) — the feed sends an additive `peer`. */
export const isOneWindowPeerEntry = (
  entry: AwcMessengerTimelineEntry,
): boolean => entry.peer !== undefined;

/**
 * DF-023: bot↔bot lines are shown by default (`showPeers` true) and only leave
 * the feed when the owner hides them. Needs you / Approvals never include them
 * (see useOneWindowFeedFilter).
 */
export const filterOneWindowPeerEntries = (input: {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly showPeers?: boolean;
}): readonly AwcMessengerTimelineEntry[] =>
  (input.showPeers ?? true)
    ? input.entries
    : input.entries.filter((entry) => !isOneWindowPeerEntry(entry));

/** Count for the "Between assistants" toggle. */
export const countOneWindowPeerEntries = (
  entries: readonly AwcMessengerTimelineEntry[],
): number => entries.filter(isOneWindowPeerEntry).length;
