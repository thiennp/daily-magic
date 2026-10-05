import AwcMessengerThreadRow from "@/features/projects/messenger/AwcMessengerThreadRow";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerThreadListProps {
  readonly threads: AwcMessengerThreadList;
  readonly selectedKey: string | null;
  readonly onSelect: (threadKey: string) => void;
}

const WHOLE_KEY = "whole";

export default function AwcMessengerThreadListPanel({
  threads,
  selectedKey,
  onSelect,
}: AwcMessengerThreadListProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <aside
      className="flex min-h-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      aria-label={copy.listHeading}
    >
      <h2 className="px-3.5 pb-2 pt-3.5 text-[13px] font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
        {copy.listHeading}
      </h2>
      <AwcMessengerThreadRow
        name={copy.wholeName}
        subtitle={copy.wholeSub}
        unreadCount={threads.wholeProject.unreadCount}
        selected={selectedKey === WHOLE_KEY}
        pinned
        onSelect={() => {
          onSelect(WHOLE_KEY);
        }}
      />
      {threads.bots.map((bot) => (
        <AwcMessengerThreadRow
          key={bot.membershipId}
          name={bot.displayName?.trim() || copy.kindBot}
          subtitle={copy.kindBot}
          status={bot.status}
          unreadCount={bot.unreadCount}
          selected={selectedKey === bot.membershipId}
          onSelect={() => {
            onSelect(bot.membershipId);
          }}
        />
      ))}
    </aside>
  );
}
