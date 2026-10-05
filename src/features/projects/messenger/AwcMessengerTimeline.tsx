import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerTimelineProps {
  readonly entries: readonly AwcMessengerTimelineEntry[];
}

export default function AwcMessengerTimeline({
  entries,
}: AwcMessengerTimelineProps) {
  return (
    <div className="flex flex-1 flex-col gap-3.5 overflow-auto bg-gray-50 p-4 dark:bg-white/[0.02]">
      {entries.map((entry) => {
        const isMine =
          entry.author.kind === "owner" || entry.author.kind === "member";
        return (
          <AwcMessengerTimelineEntryRow
            key={entry.messageId}
            entry={entry}
            isMine={isMine}
          />
        );
      })}
    </div>
  );
}
