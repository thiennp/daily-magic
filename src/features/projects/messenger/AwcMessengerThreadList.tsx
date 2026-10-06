import type { ReactNode } from "react";

import AwcMessengerThreadRow from "@/features/projects/messenger/AwcMessengerThreadRow";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";

interface AwcMessengerThreadListProps {
  readonly threads: AwcMessengerThreadList;
  readonly selectedKey: string | null;
  /** Right-aligned in the list header on desktop (owner Clear all bar). */
  readonly headerAction?: ReactNode;
  readonly onSelect: (threadKey: string) => void;
}

const WHOLE_KEY = "whole";

export default function AwcMessengerThreadListPanel({
  threads,
  selectedKey,
  headerAction,
  onSelect,
}: AwcMessengerThreadListProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <aside
      className="flex min-h-0 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
      aria-label={copy.listHeading}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="px-3.5 pb-2 pt-3.5 text-[13px] font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
          {copy.listHeading}
        </h2>
        {headerAction ? (
          <div className="hidden pr-3.5 pt-2.5 md:flex">{headerAction}</div>
        ) : null}
      </div>
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
