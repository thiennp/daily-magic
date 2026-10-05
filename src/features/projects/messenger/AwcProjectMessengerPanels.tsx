"use client";

import AwcMessengerThreadListPanel from "@/features/projects/messenger/AwcMessengerThreadList";
import { ACTIVITY_PANEL_GRID_CLASS } from "@/features/projects/messenger/activityChrome.constant";
import AwcMessengerThreadPane from "@/features/projects/messenger/AwcMessengerThreadPane";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerThreadMeta } from "@/features/projects/messenger/utils/selectMessengerThreadMeta";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

interface AwcProjectMessengerPanelsProps {
  readonly threads: AwcMessengerThreadList;
  readonly selectedKey: string | null;
  readonly selectedMeta: MessengerThreadMeta;
  readonly thread: AwcMessengerOpenThread | null;
  readonly isLoading: boolean;
  readonly canSend: boolean;
  readonly sending: boolean;
  readonly mobileShowThread: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onSelect: (threadKey: string) => void;
  readonly onBack: () => void;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
}

export default function AwcProjectMessengerPanels({
  threads,
  selectedKey,
  selectedMeta,
  thread,
  isLoading,
  canSend,
  sending,
  mobileShowThread,
  assignees,
  defaultAssigneeMembershipId,
  onSelect,
  onBack,
  onSendMessage,
  onSendTask,
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
          title={selectedMeta.title}
          kindLabel={selectedMeta.kindLabel}
          status={selectedMeta.status}
          thread={thread}
          isLoading={isLoading}
          canSend={canSend}
          sending={sending}
          showBack={mobileShowThread}
          assignees={assignees}
          defaultAssigneeMembershipId={defaultAssigneeMembershipId}
          onBack={onBack}
          onSendMessage={onSendMessage}
          onSendTask={onSendTask}
        />
      </div>
    </div>
  );
}
