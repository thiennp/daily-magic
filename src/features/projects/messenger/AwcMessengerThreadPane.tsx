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
    <section className="flex min-h-0 min-w-0 flex-col bg-awc-surface dark:bg-gray-950" aria-label={title}>
      <AwcMessengerThreadPaneHeader
        title={title}
        kindLabel={kindLabel}
        status={status}
        showBack={showBack}
        onBack={onBack}
      />
      <AwcOneWindowInFeedApprovals projectId={projectId} enabled={isOwner} />
      {showFilter ? (
        <AwcOneWindowFilterBar
          filter={filter}
          needsCount={needsCount}
          approvalsCount={approvalsCount}
          onFilter={setFilter}
          clearAllSlot={clearAllSlot}
        />
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
