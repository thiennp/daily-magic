import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type OneWindowTimelineRow =
  | { readonly type: "day"; readonly key: string; readonly label: string }
  | { readonly type: "new"; readonly key: "new" }
  | { readonly type: "entry"; readonly key: string; readonly entry: AwcMessengerTimelineEntry };

const DAY_MS = 86_400_000;

const localDayKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const startOfLocalDay = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

/** "Today · Wed 7 Oct" / "Yesterday · Tue 6 Oct" / "Mon 5 Oct" (+ year when not this year). */
export const formatOneWindowDayLabel = (date: Date, now: Date): string => {
  const copy = ONE_WINDOW_FEED_COPY;
  const sameYear = date.getFullYear() === now.getFullYear();
  const text = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  }).replace(/,/g, "");
  const daysAgo = Math.round((startOfLocalDay(now) - startOfLocalDay(date)) / DAY_MS);
  if (daysAgo === 0) return copy.dayToday.replace("{date}", text);
  if (daysAgo === 1) return copy.dayYesterday.replace("{date}", text);
  return text;
};

const isFromOthers = (entry: AwcMessengerTimelineEntry): boolean =>
  entry.author.kind === "bot";

/**
 * First unread message: the unread count (captured before the feed was marked
 * read) counts messages to you, so walk back over assistant-sent rows.
 */
export const findFirstUnreadMessageId = (
  entries: readonly AwcMessengerTimelineEntry[],
  unreadCount: number,
): string | null => {
  if (unreadCount <= 0) return null;
  const fromOthers = entries.filter(isFromOthers);
  if (fromOthers.length === 0) return null;
  return fromOthers[Math.max(0, fromOthers.length - unreadCount)].messageId;
};

/** P1-S4a: entries (oldest first) + a day separator per local day + the New marker. */
export const buildOneWindowTimelineRows = (input: {
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly now: Date;
  readonly firstUnreadId: string | null;
}): readonly OneWindowTimelineRow[] =>
  input.entries.flatMap((entry, index): OneWindowTimelineRow[] => {
    const date = new Date(entry.createdAt);
    const valid = !Number.isNaN(date.getTime());
    const prev = index > 0 ? new Date(input.entries[index - 1].createdAt) : null;
    const newDay =
      valid && (prev === null || Number.isNaN(prev.getTime()) || localDayKey(prev) !== localDayKey(date));
    return [
      ...(newDay
        ? [{ type: "day" as const, key: `day-${localDayKey(date)}`, label: formatOneWindowDayLabel(date, input.now) }]
        : []),
      ...(entry.messageId === input.firstUnreadId ? [{ type: "new" as const, key: "new" as const }] : []),
      { type: "entry" as const, key: entry.messageId, entry },
    ];
  });
