import AwcMessengerAiSessionRow from "@/features/projects/messenger/AwcMessengerAiSessionRow";
import AwcMessengerStateChips from "@/features/projects/messenger/AwcMessengerStateChips";
import AwcOneWindowMessageRow from "@/features/projects/messenger/oneWindow/AwcOneWindowMessageRow";
import AwcOneWindowSystemEntry, {
  isOneWindowSystemKind,
} from "@/features/projects/messenger/oneWindow/AwcOneWindowSystemEntry";
import AwcOneWindowTaskCard from "@/features/projects/messenger/oneWindow/AwcOneWindowTaskCard";
import {
  formatChipLabel,
  formatChipLabelMany,
} from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import { mapMessengerEntryToOneWindowItem } from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import type {
  AwcMessengerStateChip,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";

interface AwcMessengerTimelineEntryRowProps {
  readonly entry: AwcMessengerTimelineEntry;
  readonly isMine: boolean;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/** "To Scout" / "To Scout and 2 more" from live delivery chips (locked EN). */
const formatRecipients = (
  states: readonly AwcMessengerStateChip[],
): string | null => {
  const names = states
    .map((chip) => chip.displayName?.trim() ?? "")
    .filter((name) => name.length > 0);
  if (names.length === 0) return null;
  return names.length === 1
    ? formatChipLabel(names[0])
    : formatChipLabelMany(names[0], names.length - 1);
};

export default function AwcMessengerTimelineEntryRow({
  entry,
  isMine,
  chatVisibility,
}: AwcMessengerTimelineEntryRowProps) {
  if (isMessengerAiSessionEntry(entry)) {
    return (
      <AwcMessengerAiSessionRow entry={entry} chatVisibility={chatVisibility} />
    );
  }

  const who = entry.author.displayName?.trim() || entry.author.kind;
  const isAssistant = entry.author.kind === "bot";
  const timeLabel = formatWhen(entry.createdAt);
  const { windowKind, subjectState } = mapMessengerEntryToOneWindowItem(entry);

  if (windowKind === "task" && subjectState !== null) {
    const from = isMine ? "You" : who;
    const to = formatRecipients(entry.states);
    return (
      <div className={`flex flex-col gap-1.5 ${isMine ? "items-end" : "items-start"}`}>
        <AwcOneWindowTaskCard
          title={entry.text}
          statusLabel={subjectState.label}
          statusTone={subjectState.tone}
          timeLabel={timeLabel}
          subtitle={to !== null ? `${from} · ${to}` : from}
          done={subjectState.done}
          of={subjectState.of}
        />
        {isMine && entry.states.length > 1 ? (
          <AwcMessengerStateChips states={entry.states} />
        ) : null}
      </div>
    );
  }

  if (isOneWindowSystemKind(windowKind)) {
    return (
      <AwcOneWindowSystemEntry
        entry={entry}
        windowKind={windowKind}
        subjectState={subjectState}
        who={who}
        timeLabel={timeLabel}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${isMine ? "items-end" : "items-start"}`}>
      <AwcOneWindowMessageRow
        who={isMine ? "You" : who}
        isSelf={isMine}
        isAssistant={isAssistant}
        timeLabel={timeLabel}
        text={entry.text}
      />
      {isMine ? <AwcMessengerStateChips states={entry.states} /> : null}
    </div>
  );
}
