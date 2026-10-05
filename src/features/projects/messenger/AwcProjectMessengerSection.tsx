"use client";

import { useCallback, useMemo, useState } from "react";

import AwcMessengerEmptyState from "@/features/projects/messenger/AwcMessengerEmptyState";
import AwcProjectMessengerHeading from "@/features/projects/messenger/AwcProjectMessengerHeading";
import AwcProjectMessengerPanels from "@/features/projects/messenger/AwcProjectMessengerPanels";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { useAwcProjectMessengerThread } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThread";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import { defaultMessengerTaskAssignee } from "@/features/projects/messenger/utils/defaultMessengerTaskAssignee";
import { messengerBotAssigneeOptions } from "@/features/projects/messenger/utils/messengerBotAssigneeOptions";
import { selectMessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import { sumMessengerUnreadCount } from "@/features/projects/messenger/utils/sumMessengerUnreadCount";

interface AwcProjectMessengerSectionProps {
  readonly projectId: string;
  /** Overview attention / hash deep-link into a bot thread (membershipId or "whole"). */
  readonly initialThreadKey?: string | null;
  /** Parent tab badge: refresh after open/send marks read or changes unread. */
  readonly onUnreadMaybeChanged?: () => void;
}

const WHOLE_KEY = "whole";

export default function AwcProjectMessengerSection({
  projectId,
  initialThreadKey = null,
  onUnreadMaybeChanged,
}: AwcProjectMessengerSectionProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const list = useAwcProjectMessengerThreads(projectId);
  const reloadThreads = list.reload;
  const [selectedKey, setSelectedKey] = useState<string | null>(
    initialThreadKey ?? WHOLE_KEY,
  );
  const [mobileShowThread, setMobileShowThread] = useState(
    initialThreadKey !== null && initialThreadKey !== WHOLE_KEY,
  );
  const onOpened = useCallback(() => {
    void reloadThreads();
    onUnreadMaybeChanged?.();
  }, [onUnreadMaybeChanged, reloadThreads]);
  const open = useAwcProjectMessengerThread({
    projectId,
    threadKey: selectedKey,
    onOpened,
  });

  const selectedMeta = useMemo(
    () => selectMessengerThreadMeta({ selectedKey, threads: list.threads }),
    [list.threads, selectedKey],
  );
  const assignees = useMemo(
    () => messengerBotAssigneeOptions(list.threads?.bots ?? []),
    [list.threads],
  );
  const unreadTotal = sumMessengerUnreadCount(list.threads);

  if (list.isLoading) {
    return <p className="text-xs text-gray-400">{copy.loading}</p>;
  }
  if (list.unavailable || list.forbidden) {
    return (
      <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
        {list.message ?? copy.unavailable}
      </p>
    );
  }
  if (list.threads === null) return null;
  if (list.threads.bots.length === 0) return <AwcMessengerEmptyState />;

  const canSend = list.threads.canSend && (open.thread?.canSend ?? true);

  return (
    <div className="space-y-3">
      <AwcProjectMessengerHeading
        unreadTotal={unreadTotal}
        message={open.message}
      />
      <AwcProjectMessengerPanels
        threads={list.threads}
        selectedKey={selectedKey}
        selectedMeta={selectedMeta}
        thread={open.thread}
        isLoading={open.isLoading}
        canSend={canSend}
        sending={open.sending}
        mobileShowThread={mobileShowThread}
        assignees={assignees}
        defaultAssigneeMembershipId={defaultMessengerTaskAssignee(selectedKey)}
        onSelect={(key) => {
          setSelectedKey(key);
          setMobileShowThread(true);
        }}
        onBack={() => {
          setMobileShowThread(false);
        }}
        onSendMessage={async (text, needsReply) => {
          const ok = await open.send(text, needsReply);
          if (ok) {
            void list.reload();
            onUnreadMaybeChanged?.();
          }
          return ok;
        }}
        onSendTask={async (draft) => {
          const ok = await open.sendTask(draft);
          if (ok) {
            void list.reload();
            onUnreadMaybeChanged?.();
          }
          return ok;
        }}
      />
    </div>
  );
}
