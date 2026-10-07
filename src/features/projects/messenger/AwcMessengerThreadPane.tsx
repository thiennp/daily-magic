"use client";

import AwcMessengerComposer from "@/features/projects/messenger/AwcMessengerComposer";
import AwcMessengerThreadPaneHeader from "@/features/projects/messenger/AwcMessengerThreadPaneHeader";
import AwcMessengerTimeline from "@/features/projects/messenger/AwcMessengerTimeline";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import AwcOneWindowFeedEmpty from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedEmpty";
import AwcOneWindowFeedLoading from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedLoading";
import AwcOneWindowFilterBar from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import AwcOneWindowInFeedApprovals from "@/features/projects/messenger/oneWindow/AwcOneWindowInFeedApprovals";
import { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import { useOneWindowFeedFilter } from "@/features/projects/messenger/oneWindow/useOneWindowFeedFilter";
import type { AwcMessengerThreadPaneProps } from "@/features/projects/messenger/types/awcMessengerThreadPane.type";

export default function AwcMessengerThreadPane({
  projectId,
  memberKey = null,
  isOwner = false,
  title,
  kindLabel,
  status,
  thread,
  isLoading,
  loadingOlder,
  canLoadOlder,
  reachedStart,
  projectComputerOffline,
  canSend,
  sending,
  showBack,
  assignees,
  defaultAssigneeMembershipId,
  clearAllSlot,
  onBack,
  onLoadOlder,
  onSendMessage,
  onSendTask,
  chatVisibility,
}: AwcMessengerThreadPaneProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const routingAssistants = assignees.map((a) => ({
    membershipId: a.membershipId,
    displayName: a.displayName,
  }));
  const routing = useOneWindowComposerRouting({
    projectId,
    memberKey,
    assistants: routingAssistants,
  });
  const { entries, filter, setFilter, needsCount, approvalsCount, filtered } =
    useOneWindowFeedFilter({ thread, isOwner, chatVisibility });

  const showFilter = !isLoading && thread !== null && entries.length > 0;

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-awc-surface dark:bg-gray-950" aria-label={title}>
      {/* P1-S2: whole feed has no header; an assistant's private feed gets ← Whole project. */}
      {showBack ? (
        <AwcMessengerThreadPaneHeader title={title} kindLabel={kindLabel} status={status} showBack onBack={onBack} />
      ) : null}
      <AwcOneWindowInFeedApprovals projectId={projectId} enabled={isOwner} />
      {showFilter ? (
        <AwcOneWindowFilterBar
          filter={filter}
          needsCount={needsCount}
          approvalsCount={approvalsCount}
          onFilter={setFilter}
          clearAllSlot={clearAllSlot}
        />
      ) : clearAllSlot ? (
        <div className="flex justify-end border-b border-awc-border px-4 py-2">{clearAllSlot}</div>
      ) : null}
      {isLoading ? <AwcOneWindowFeedLoading /> : null}
      {!isLoading && thread !== null && filtered.length === 0 ? (
        <AwcOneWindowFeedEmpty />
      ) : null}
      {!isLoading && thread !== null && filtered.length > 0 ? (
        <AwcMessengerTimeline
          entries={filtered}
          loadingOlder={loadingOlder}
          canLoadOlder={canLoadOlder}
          reachedStart={reachedStart}
          projectComputerOffline={projectComputerOffline}
          onLoadOlder={onLoadOlder}
          chatVisibility={chatVisibility}
        />
      ) : null}
      {canSend ? (
        <AwcMessengerComposer
          disabled={sending}
          sending={sending}
          assignees={assignees}
          defaultAssigneeMembershipId={defaultAssigneeMembershipId}
          onSendMessage={onSendMessage}
          onSendTask={onSendTask}
          routing={routing}
        />
      ) : (
        <p className="border-t border-awc-border bg-awc-surface-2 px-4 py-3.5 text-center text-sm text-awc-fg dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300">
          {copy.viewerBanner}
        </p>
      )}
    </section>
  );
}
