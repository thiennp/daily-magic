"use client";

import { useState } from "react";

import AwcMessengerComposerModeToggle from "@/features/projects/messenger/AwcMessengerComposerModeToggle";
import type { AwcMessengerComposerMode } from "@/features/projects/messenger/AwcMessengerComposerModeToggle";
import AwcMessengerMessageComposer from "@/features/projects/messenger/AwcMessengerMessageComposer";
import AwcMessengerTaskComposer from "@/features/projects/messenger/AwcMessengerTaskComposer";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

interface AwcMessengerComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly routing?: Routing;
}

/** Activity composer: Message | Assign task + OW-H2 routing chrome. */
export default function AwcMessengerComposer({
  disabled,
  sending,
  assignees,
  defaultAssigneeMembershipId,
  onSendMessage,
  onSendTask,
  routing,
}: AwcMessengerComposerProps) {
  const [mode, setMode] = useState<AwcMessengerComposerMode>("message");
  const assistants = assignees.map((a) => ({
    membershipId: a.membershipId,
    displayName: a.displayName,
  }));

  return (
    <div className="flex flex-col gap-2 border-t border-awc-border bg-awc-surface p-3 dark:border-gray-800 dark:bg-gray-950">
      <AwcMessengerComposerModeToggle
        mode={mode}
        disabled={disabled || sending}
        onMode={setMode}
      />
      {mode === "message" ? (
        <AwcMessengerMessageComposer
          disabled={disabled}
          sending={sending}
          onSend={onSendMessage}
          routing={routing}
          assistants={assistants}
        />
      ) : (
        <AwcMessengerTaskComposer
          disabled={disabled}
          sending={sending}
          assignees={assignees}
          defaultAssigneeMembershipId={defaultAssigneeMembershipId}
          onSend={onSendTask}
        />
      )}
    </div>
  );
}
