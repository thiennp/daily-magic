import formatProjectMessageKindLabel from "@/features/projects/access/inbox/utils/formatProjectMessageKindLabel";
import type {
  AwcMessengerMessageState,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";

/** Compact line text cap (matches the Neon summary meta budget). */
export const ONE_WINDOW_PEER_TEXT_MAX_CHARS = 120;

/** State-only kinds keep the chip copy (Got it / Working on it / Done / Blocked). */
const CHIP_STATE_BY_KIND: Readonly<Record<string, AwcMessengerMessageState>> = {
  "task.received": "got_it",
  "task.processing": "working",
  "task.done": "done",
  "task.blocked": "blocked",
};

export type OneWindowPeerLine = {
  readonly from: string;
  readonly to: string;
  readonly label: string;
  readonly text: string;
  /** True for state-only kinds (render chip-style). */
  readonly stateOnly: boolean;
};

const clip = (text: string): string => {
  const trimmed = text.trim();
  return trimmed.length > ONE_WINDOW_PEER_TEXT_MAX_CHARS
    ? `${trimmed.slice(0, ONE_WINDOW_PEER_TEXT_MAX_CHARS - 1)}…`
    : trimmed;
};

/**
 * DF-023: owner-view bot↔bot row → "Kai → AW Lead · Status update · summary".
 * Returns null for entries that are not bot↔bot.
 */
export const formatOneWindowPeerLine = (
  entry: AwcMessengerTimelineEntry,
): OneWindowPeerLine | null => {
  if (entry.peer === undefined) return null;
  const from = entry.author.displayName?.trim() || "Assistant";
  const to =
    entry.peer.toDisplayName?.trim() ||
    (entry.peer.toTeamLabel !== null ? `@${entry.peer.toTeamLabel}` : "") ||
    "Assistant";
  const chipState = CHIP_STATE_BY_KIND[entry.kind];
  return {
    from,
    to,
    label:
      chipState !== undefined
        ? formatMessengerStateLabel(chipState, null)
        : formatProjectMessageKindLabel(entry.kind),
    text: clip(entry.text),
    stateOnly:
      entry.kind === "task.received" || entry.kind === "task.processing",
  };
};

/** Plain one-line string (a11y label / tests). */
export const formatOneWindowPeerLineText = (line: OneWindowPeerLine): string =>
  [`${line.from} → ${line.to}`, line.label, line.text]
    .filter((part) => part.length > 0)
    .join(" · ");
