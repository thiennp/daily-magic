"use client";

import { useMemo, useState, type ReactNode } from "react";

import { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import AwcOneWindowInFeedApprovals from "@/features/projects/messenger/oneWindow/AwcOneWindowInFeedApprovals";
import {
  isOneWindowApprovalItem,
  isOneWindowNeedsYouForViewer,
  mapMessengerEntryToOneWindowItem,
} from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";

import AwcMessengerComposer from "@/features/projects/messenger/AwcMessengerComposer";
import AwcMessengerStatusDot from "@/features/projects/messenger/AwcMessengerStatusDot";
import AwcMessengerTimeline from "@/features/projects/messenger/AwcMessengerTimeline";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { ACTIVITY_LINK_CLASS } from "@/features/projects/messenger/activityChrome.constant";
import AwcOneWindowFeedEmpty from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedEmpty";
import AwcOneWindowFeedLoading from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedLoading";
import AwcOneWindowFilterBar, {
  type OneWindowFeedFilter,
} from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { isMessengerAiSessionEntry } from "@/features/projects/messenger/utils/isMessengerAiSessionEntry";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

interface AwcMessengerThreadPaneProps {
  readonly projectId: string;
  readonly memberKey?: string | null;
  readonly isOwner?: boolean;
  readonly title: string;
  readonly kindLabel: string;
  readonly status?: AwcMessengerBotStatus;
  readonly thread: AwcMessengerOpenThread | null;
  readonly isLoading: boolean;
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly reachedStart: boolean;
  readonly projectComputerOffline: boolean;
  readonly canSend: boolean;
  readonly sending: boolean;
  readonly showBack: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly clearAllSlot?: ReactNode;
  readonly onBack: () => void;
  readonly onLoadOlder: () => void;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}

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
  const feed = ONE_WINDOW_FEED_COPY;
  const [filter, setFilter] = useState<OneWindowFeedFilter>("all");

  const entries = useMemo(() => thread?.entries ?? [], [thread]);
  // OW-H5: chips read window kind + live subject state from existing feed fields.
  // Session rows render nothing under tasks_tab_only (row default) → not counted.
  const sessionsHidden = (chatVisibility ?? "tasks_tab_only") === "tasks_tab_only";
  // Needs you = owner-created or assigned-to-viewer rows only (Product/Lead).
  const items = useMemo(() => {
    const viewer = { isOwner };
    const entriesById = new Map(entries.map((entry) => [entry.messageId, entry]));
    return entries
      .filter((entry) => !(sessionsHidden && isMessengerAiSessionEntry(entry)))
      .map((entry) => {
        const item = mapMessengerEntryToOneWindowItem(entry);
        return {
          entry,
          approval: isOneWindowApprovalItem(item),
          needsYou: isOneWindowNeedsYouForViewer({ entry, item, viewer, entriesById }),
        };
      });
  }, [entries, sessionsHidden, isOwner]);
  const needsCount = items.filter((row) => row.needsYou).length;
  const approvalsCount = items.filter((row) => row.approval).length;

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return items
      .filter((row) => (filter === "approvals" ? row.approval : row.needsYou))
      .map((row) => row.entry);
  }, [entries, items, filter]);

  const showFilter = !isLoading && thread !== null && entries.length > 0;

  return (
    <section className="flex min-h-0 min-w-0 flex-col bg-awc-surface dark:bg-gray-950" aria-label={title}>
      <div className="flex items-center justify-between gap-3 border-b border-awc-border px-4 py-3 dark:border-gray-800">
        <div className="min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className={`mb-1 ${ACTIVITY_LINK_CLASS}`}
              aria-label={copy.a11yBack}
            >
              ← {copy.listHeading}
            </button>
          ) : null}
          <h3 className="truncate text-base font-semibold text-awc-fg dark:text-white">
            {title}
          </h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-awc-fg-muted">
            <span>{kindLabel}</span>
            {status !== undefined ? (
              <>
                <span aria-hidden>·</span>
                <AwcMessengerStatusDot status={status} />
              </>
            ) : null}
          </div>
        </div>
        <a
          href="#awc-project-access"
          className="shrink-0 text-[12.5px] font-medium text-awc-blue-700 underline-offset-2 hover:underline"
        >
          {feed.accessDeepLink}
        </a>
      </div>
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
