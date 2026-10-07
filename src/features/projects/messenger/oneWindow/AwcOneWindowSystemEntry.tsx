import AwcOneWindowApprovalEntry from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalEntry";
import AwcOneWindowBotToBotCard from "@/features/projects/messenger/oneWindow/AwcOneWindowBotToBotCard";
import AwcOneWindowNoticeRow from "@/features/projects/messenger/oneWindow/AwcOneWindowNoticeRow";
import AwcOneWindowTaskUpdateRow from "@/features/projects/messenger/oneWindow/AwcOneWindowTaskUpdateRow";
import type { OneWindowSubjectState } from "@/features/projects/messenger/oneWindow/oneWindowFeedItem.type";
import type {
  AwcMessengerTimelineEntry,
  AwcMessengerWindowKind,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** Window kinds drawn as their own One window row instead of a message bubble. */
const SYSTEM_KINDS: ReadonlySet<AwcMessengerWindowKind> = new Set([
  "task_update",
  "approval_request",
  "approval_result",
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
  readonly subjectState: OneWindowSubjectState | null;
  readonly who: string;
  readonly timeLabel: string;
}

/**
 * P1-S5: rows picked by OW9 `windowKind`. task_update → pill from the
 * server's subjectState (DF-027 labels; none when null); approval_* →
 * approval row; notice / bot_to_bot → their cards. Dispatch sends notice and
 * bot_to_bot rows in a later r2 (the thread builder drops them today), so
 * those light up with no UI change.
 */
export default function AwcOneWindowSystemEntry({
  entry,
  windowKind,
  subjectState,
  who,
  timeLabel,
}: AwcOneWindowSystemEntryProps) {
  if (windowKind === "notice") {
    return <AwcOneWindowNoticeRow text={entry.text} timeLabel={timeLabel} />;
  }
  if (windowKind === "approval_request" || windowKind === "approval_result") {
    return (
      <AwcOneWindowApprovalEntry
        kind={windowKind}
        who={who}
        text={entry.text}
        timeLabel={timeLabel}
      />
    );
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
  return (
    <AwcOneWindowTaskUpdateRow
      who={who}
      textHtmlSafe={entry.text}
      statusLabel={subjectState?.label}
      statusTone={subjectState?.tone}
      timeLabel={timeLabel}
    />
  );
}
