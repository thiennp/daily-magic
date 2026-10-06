"use client";

import { useMemo } from "react";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectAskBox from "@/features/projects/askBox/AwcProjectAskBox";
import AwcProjectChatDockFab from "@/features/projects/chatDock/AwcProjectChatDockFab";
import AwcProjectChatDockPopover from "@/features/projects/chatDock/AwcProjectChatDockPopover";
import { dockTaskComputerTargets } from "@/features/projects/chatDock/dockTaskComputerTargets";
import {
  CHAT_DOCK_ROOT_CLASS,
  CHAT_DOCK_ROOT_FULL_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { useAwcProjectChatDock } from "@/features/projects/chatDock/useAwcProjectChatDock";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import sumMessengerUnread from "@/features/projects/overview/sumMessengerUnread";

interface AwcProjectChatDockProps {
  readonly projectId: string;
  readonly threads: AwcMessengerThreadList | null;
  readonly onSent: (threadKey: string) => void;
}

/**
 * V5-4 floating Chat dock — FAB + popover + full-screen expand.
 * Reuses ask-box → messenger / inbox dispatch (no new API).
 */
export default function AwcProjectChatDock({
  projectId,
  threads,
  onSent,
}: AwcProjectChatDockProps) {
  const dock = useAwcProjectChatDock();
  const access = useAwcProjectAccess(projectId);
  const computers = useMemo(
    () =>
      dockTaskComputerTargets(access.members).map((t) => ({
        key: t.key,
        label: t.label,
      })),
    [access.members],
  );
  if (threads === null) return null;
  const canSend = threads.canSend;
  const rootClass =
    dock.open && dock.full ? CHAT_DOCK_ROOT_FULL_CLASS : CHAT_DOCK_ROOT_CLASS;
  return (
    <div className={rootClass}>
      {dock.open ? (
        <AwcProjectChatDockPopover
          full={dock.full}
          canSend={canSend}
          onToggleFull={dock.toggleFull}
          onClose={dock.closeDock}
        >
          {canSend ? (
            <AwcProjectAskBox
              projectId={projectId}
              bots={threads.bots}
              computers={computers}
              onSent={onSent}
              layout="dock"
            />
          ) : null}
        </AwcProjectChatDockPopover>
      ) : (
        <AwcProjectChatDockFab
          unreadCount={sumMessengerUnread(threads)}
          expanded={false}
          onToggle={dock.toggleDock}
        />
      )}
    </div>
  );
}
