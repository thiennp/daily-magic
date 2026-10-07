import AwcMessengerAiSessionRow from "@/features/projects/messenger/AwcMessengerAiSessionRow";
import AwcMessengerStateChips from "@/features/projects/messenger/AwcMessengerStateChips";
import AwcOneWindowMessageRow from "@/features/projects/messenger/oneWindow/AwcOneWindowMessageRow";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
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
  return (
    <div className={`flex flex-col gap-1.5 ${isMine ? "items-end" : "items-start"}`}>
      <AwcOneWindowMessageRow
        who={isMine ? "You" : who}
        isSelf={isMine}
        isAssistant={isAssistant}
        timeLabel={formatWhen(entry.createdAt)}
        text={entry.text}
      />
      {isMine ? <AwcMessengerStateChips states={entry.states} /> : null}
    </div>
  );
}
