"use client";

import { useMemo } from "react";

import AwcProjectMessengerGateView, {
  resolveMessengerGate,
} from "@/features/projects/messenger/AwcProjectMessengerGate";
import AwcMessengerNoComputerHint from "@/features/projects/messenger/AwcMessengerNoComputerHint";
import AwcMessengerThreadPane from "@/features/projects/messenger/AwcMessengerThreadPane";
import AwcProjectMessengerInboxClearBar from "@/features/projects/messenger/AwcProjectMessengerInboxClearBar";
import AwcProjectMessengerInboxClearModals from "@/features/projects/messenger/AwcProjectMessengerInboxClearModals";
import {
  useAwcProjectMessengerFeed,
  WHOLE_THREAD_KEY,
} from "@/features/projects/messenger/hooks/useAwcProjectMessengerFeed";
import { useAwcProjectMessengerInboxClear } from "@/features/projects/messenger/hooks/useAwcProjectMessengerInboxClear";
import AwcOneWindowFeedNotices from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedNotices";
import { useOneWindowUnreadSnapshot } from "@/features/projects/messenger/oneWindow/useOneWindowUnreadSnapshot";
import { OW_SURFACE_CLASS } from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import {
  oneWindowArchivedNoticeText,
  oneWindowQuietNoticeTexts,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedNotices";
import { messengerTaskAssigneeOptions } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import { selectMessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import type { AwcProjectMessengerSectionProps } from "@/features/projects/messenger/AwcProjectMessengerSection.types";
import useProjectTasksChatVisibility from "@/features/projects/tasks/useProjectTasksChatVisibility";

/**
 * P1-S2 One window: ONE full-width chat column (no thread list). Whole-project
 * feed with filters, in-feed approvals, newest at the bottom (scroll up loads
 * older) and the composer pinned at the bottom.
 */
export default function AwcProjectMessengerSection({
  projectId,
  hasOwnerComputer,
  initialThreadKey = null,
  onUnreadMaybeChanged,
  isOwner = false,
  initialUnreadCount = 0,
}: AwcProjectMessengerSectionProps) {
  const feed = useAwcProjectMessengerFeed({
    projectId,
    hasOwnerComputer,
    initialThreadKey,
    onUnreadMaybeChanged,
  });
  const { list, open, selectedKey } = feed;
  const unreadCount = useOneWindowUnreadSnapshot({
    selectedKey,
    initialKey: initialThreadKey ?? WHOLE_THREAD_KEY,
    initialCount: initialUnreadCount,
    threads: list.threads,
  });
  const chatVisibility = useProjectTasksChatVisibility(projectId);
  const inboxClear = useAwcProjectMessengerInboxClear(projectId, isOwner);
  const meta = useMemo(
    () => selectMessengerThreadMeta({ selectedKey, threads: list.threads }),
    [list.threads, selectedKey],
  );
  const assignees = useMemo(
    () => messengerTaskAssigneeOptions({ bots: list.threads?.bots ?? [] }),
    [list.threads],
  );
  const quiet = useMemo(
    () => oneWindowQuietNoticeTexts({ bots: list.threads?.bots ?? [], selectedKey }),
    [list.threads, selectedKey],
  );
  const { inbox } = inboxClear;
  const gate = resolveMessengerGate({ ...list, hasProject: projectId.trim() !== "" });
  if (gate.kind !== "ready") {
    return <AwcProjectMessengerGateView gate={gate} onRetry={() => void list.reload()} />;
  }
  const canSend = gate.threads.canSend && (open.thread?.canSend ?? true);

  return (
    <div className={OW_SURFACE_CLASS} data-one-window="chat">
      {!hasOwnerComputer ? <AwcMessengerNoComputerHint /> : null}
      {open.message !== null ? (
        <p className="px-4 pt-2 text-xs text-awc-warn">{open.message}</p>
      ) : null}
      <AwcMessengerThreadPane
        projectId={projectId}
        isOwner={isOwner}
        title={meta.title}
        kindLabel={meta.kindLabel}
        status={meta.status}
        thread={open.thread}
        isLoading={open.isLoading}
        loadingOlder={open.loadingOlder}
        canLoadOlder={open.canLoadOlder}
        reachedStart={open.reachedStart}
        projectComputerOffline={open.projectComputerOffline}
        canSend={canSend}
        sending={open.sending}
        showBack={selectedKey !== WHOLE_THREAD_KEY}
        assignees={assignees}
        feedSwitch={{ key: selectedKey, onSelect: feed.setSelectedKey }}
        clearAllSlot={
          inboxClear.visible ? <AwcProjectMessengerInboxClearBar clear={inboxClear} /> : null
        }
        noticesSlot={
          <AwcOneWindowFeedNotices
            archivedText={isOwner ? oneWindowArchivedNoticeText(inbox.archivedCount) : null}
            onRestore={inbox.canRestore ? () => inboxClear.setRestoreAllOpen(true) : undefined}
            quiet={quiet}
          />
        }
        unreadCount={unreadCount}
        onBack={() => feed.setSelectedKey(WHOLE_THREAD_KEY)}
        onLoadOlder={() => void open.loadOlder()}
        onSendMessage={async (text, needsReply) =>
          feed.afterSend(await open.send(text, needsReply))
        }
        onSendTask={async (draft) => feed.afterSend(await open.sendTask(draft))}
        chatVisibility={chatVisibility}
      />
      {isOwner ? <AwcProjectMessengerInboxClearModals clear={inboxClear} /> : null}
    </div>
  );
}
