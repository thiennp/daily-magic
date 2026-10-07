"use client";

import type { ReactNode } from "react";

import AwcMessengerThreadListPanel from "@/features/projects/messenger/AwcMessengerThreadList";
import { ACTIVITY_PANEL_GRID_CLASS } from "@/features/projects/messenger/activityChrome.constant";
import AwcMessengerThreadPane from "@/features/projects/messenger/AwcMessengerThreadPane";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

interface AwcProjectMessengerPanelsProps {
  readonly projectId: string;
  readonly memberKey?: string | null;
  readonly threads: AwcMessengerThreadList;
  /** Desktop list-header action (owner Clear all bar). */
  readonly headerAction?: ReactNode;
  readonly selectedKey: string | null;
  readonly selectedMeta: MessengerThreadMeta;
  readonly thread: AwcMessengerOpenThread | null;
  readonly isLoading: boolean;
  readonly loadingOlder: boolean;
  readonly canLoadOlder: boolean;
  readonly reachedStart: boolean;
  readonly projectComputerOffline: boolean;
  readonly canSend: boolean;
  readonly sending: boolean;
  readonly mobileShowThread: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onSelect: (threadKey: string) => void;
  readonly onBack: () => void;
  readonly onLoadOlder: () => void;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}

export default function AwcProjectMessengerPanels({
  projectId,
  memberKey = null,
  threads,
  headerAction,
  selectedKey,
  selectedMeta,
  thread,
  isLoading,
  loadingOlder,
  canLoadOlder,
  reachedStart,
  projectComputerOffline,
  canSend,
  sending,
  mobileShowThread,
  assignees,
  defaultAssigneeMembershipId,
  onSelect,
  onBack,
  onLoadOlder,
  onSendMessage,
  onSendTask,
  chatVisibility,
}: AwcProjectMessengerPanelsProps) {
  return (
    <div className={ACTIVITY_PANEL_GRID_CLASS}>
      <div
        className={`${
          mobileShowThread ? "hidden md:flex" : "flex"
        } min-h-0 flex-col`}
      >
        <AwcMessengerThreadListPanel
          threads={threads}
          headerAction={headerAction}
          selectedKey={selectedKey}
          onSelect={onSelect}
        />
      </div>
      <div
        className={`${
          mobileShowThread ? "flex" : "hidden md:flex"
        } min-h-0 min-w-0 flex-col`}
      >
        <AwcMessengerThreadPane
          projectId={projectId}
          memberKey={memberKey}
          title={selectedMeta.title}
          kindLabel={selectedMeta.kindLabel}
          status={selectedMeta.status}
          thread={thread}
          isLoading={isLoading}
          loadingOlder={loadingOlder}
          canLoadOlder={canLoadOlder}
          reachedStart={reachedStart}
          projectComputerOffline={projectComputerOffline}
          canSend={canSend}
          sending={sending}
          showBack={mobileShowThread}
          assignees={assignees}
          defaultAssigneeMembershipId={defaultAssigneeMembershipId}
          onBack={onBack}
          onLoadOlder={onLoadOlder}
          onSendMessage={onSendMessage}
          onSendTask={onSendTask}
        
          chatVisibility={chatVisibility}
          clearAllSlot={headerAction}
        />
      </div>
    </div>
  );
}
