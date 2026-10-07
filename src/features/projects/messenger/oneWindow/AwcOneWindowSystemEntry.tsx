import AwcOneWindowBotToBotCard from "@/features/projects/messenger/oneWindow/AwcOneWindowBotToBotCard";
import AwcOneWindowNoticeRow from "@/features/projects/messenger/oneWindow/AwcOneWindowNoticeRow";
import AwcOneWindowTaskUpdateRow from "@/features/projects/messenger/oneWindow/AwcOneWindowTaskUpdateRow";
import { oneWindowTaskUpdateStatus } from "@/features/projects/messenger/oneWindow/oneWindowTaskUpdateStatus";
import type {
  AwcMessengerTimelineEntry,
  AwcMessengerWindowKind,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Window kinds drawn as their own One window row instead of a message bubble. */
const SYSTEM_KINDS: ReadonlySet<AwcMessengerWindowKind> = new Set([
  "task_update",
  "notice",
  "bot_to_bot",
]);

export const isOneWindowSystemKind = (kind: AwcMessengerWindowKind): boolean =>
  SYSTEM_KINDS.has(kind);

const recipientNames = (entry: AwcMessengerTimelineEntry): string =>
  entry.states
    .map((chip) => chip.displayName?.trim() ?? "")
    .filter((name) => name.length > 0)
    .join(", ");

interface AwcOneWindowSystemEntryProps {
  readonly entry: AwcMessengerTimelineEntry;
  readonly windowKind: AwcMessengerWindowKind;
  readonly who: string;
  readonly timeLabel: string;
}

/**
 * P1-S3: task_update (derived today from bot `task.*` replies) → task-update
 * row with DF-027 labels. `notice` / `bot_to_bot` only arrive once the feed
 * sends OW9 `windowKind` (today the server drops system and bot↔bot rows).
 */
export default function AwcOneWindowSystemEntry({
  entry,
  windowKind,
  who,
  timeLabel,
}: AwcOneWindowSystemEntryProps) {
  if (windowKind === "notice") {
    return <AwcOneWindowNoticeRow text={entry.text} timeLabel={timeLabel} />;
  }
  if (windowKind === "bot_to_bot") {
    const to = recipientNames(entry);
    return (
      <AwcOneWindowBotToBotCard
        timeLabel={timeLabel}
        lines={[{ who, to: to.length > 0 ? to : "—", text: entry.text }]}
      />
    );
  }
  const status = oneWindowTaskUpdateStatus(entry.kind);
  return (
    <AwcOneWindowTaskUpdateRow
      who={who}
      textHtmlSafe={entry.text}
      statusLabel={status.label}
      statusTone={status.tone}
      timeLabel={timeLabel}
    />
  );
}
