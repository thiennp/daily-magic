"use client";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectChatDockFab from "@/features/projects/chatDock/AwcProjectChatDockFab";
import AwcProjectChatDockPopover from "@/features/projects/chatDock/AwcProjectChatDockPopover";
import { openProjectAccessPending } from "@/features/projects/chatDock/openProjectAccessPending";
import {
  CHAT_DOCK_ROOT_CLASS,
  CHAT_DOCK_ROOT_FULL_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import type { AwcProjectChatSurface } from "@/features/projects/chatDock/useAwcProjectChatSurface";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import { unreadForMessengerThread } from "@/features/projects/messenger/oneWindow/useOneWindowUnreadSnapshot";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import buildOverviewAttention from "@/features/projects/overview/buildOverviewAttention";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";
import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectChatDockProps {
  readonly project: UserProjectRecord;
  readonly isOwner: boolean;
  readonly threads: AwcMessengerThreadList | null;
  /** Dock state + "go to chat" (P1-S1: replaces the Activity tab). */
  readonly chat: AwcProjectChatSurface;
  readonly onUnreadMaybeChanged: () => void;
}

/**
 * V5-4 floating Chat dock — two states only: the button (minimal) and the
 * full project conversations (maximal, full screen on mobile).
 * Unread FAB click opens the full view on the thread that needs you.
 */
export default function AwcProjectChatDock({
  project,
  isOwner,
  threads,
  chat,
  onUnreadMaybeChanged,
}: AwcProjectChatDockProps) {
  const { dock } = chat;
  const access = useAwcProjectAccess(project.id);
  if (threads === null) return null;
  const unreadCount = sumMessengerUnread(threads);
  const onFabToggle = () => {
    if (unreadCount > 0) {
      chat.onGotoChat(buildOverviewAttention(threads)?.membershipId ?? null);
      return;
    }
    dock.toggleDock();
  };
  const rootClass = dock.open
    ? CHAT_DOCK_ROOT_FULL_CLASS
    : CHAT_DOCK_ROOT_CLASS;
  return (
    <div className={rootClass}>
      {dock.open ? (
        <AwcProjectChatDockPopover
          onClose={dock.closeDock}
          accessPendingCount={isOwner ? access.pending.length : 0}
          onOpenAccess={() => {
            dock.closeDock();
            window.requestAnimationFrame(() => openProjectAccessPending());
          }}
        >
          <AwcProjectMessengerSection
            key={`${chat.refreshKey}:${chat.threadKey ?? ""}`}
            projectId={project.id}
            hasOwnerComputer={projectHasOwnerComputer(project)}
            initialThreadKey={chat.threadKey}
            isOwner={isOwner}
            initialUnreadCount={unreadForMessengerThread(
              threads,
              chat.threadKey ?? PROJECT_MESSENGER_WHOLE_THREAD_KEY,
            )}
            onUnreadMaybeChanged={onUnreadMaybeChanged}
          />
        </AwcProjectChatDockPopover>
      ) : (
        <AwcProjectChatDockFab
          unreadCount={unreadCount}
          expanded={false}
          onToggle={onFabToggle}
        />
      )}
    </div>
  );
}
