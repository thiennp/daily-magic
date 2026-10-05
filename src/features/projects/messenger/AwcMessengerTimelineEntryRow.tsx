import AwcMessengerStateChips from "@/features/projects/messenger/AwcMessengerStateChips";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerTimelineEntryRowProps {
  readonly entry: AwcMessengerTimelineEntry;
  readonly isMine: boolean;
}

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
};

export default function AwcMessengerTimelineEntryRow({
  entry,
  isMine,
}: AwcMessengerTimelineEntryRowProps) {
  const who = entry.author.displayName?.trim() || entry.author.kind;
  return (
    <div
      className={`flex max-w-[85%] flex-col gap-1.5 ${
        isMine ? "self-end items-end" : "self-start items-start"
      }`}
    >
      <div
        className={`rounded-xl px-3 py-2 text-sm leading-5 ${
          isMine
            ? "rounded-br-sm bg-blue-600 text-white"
            : "rounded-bl-sm border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        }`}
      >
        <div
          className={`mb-1 text-xs font-semibold ${
            isMine ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {isMine ? "You" : who}
        </div>
        <p className="whitespace-pre-wrap">{entry.text}</p>
      </div>
      {isMine ? <AwcMessengerStateChips states={entry.states} /> : null}
      <span className="text-xs text-gray-500">{formatWhen(entry.createdAt)}</span>
    </div>
  );
}
