"use client";

import { useState } from "react";

import AwcMessengerComposerModeToggle from "@/features/projects/messenger/AwcMessengerComposerModeToggle";
import type { AwcMessengerComposerMode } from "@/features/projects/messenger/AwcMessengerComposerModeToggle";
import AwcMessengerMessageComposer from "@/features/projects/messenger/AwcMessengerMessageComposer";
import AwcMessengerTaskComposer from "@/features/projects/messenger/AwcMessengerTaskComposer";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

interface AwcMessengerComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
}

/** Activity composer: Message | Assign task (messenger send + inbox dispatch). */
export default function AwcMessengerComposer({
  disabled,
  sending,
  assignees,
  defaultAssigneeMembershipId,
  onSendMessage,
  onSendTask,
}: AwcMessengerComposerProps) {
  const [mode, setMode] = useState<AwcMessengerComposerMode>("message");

  return (
    <div className="flex flex-col gap-2 border-t border-awc-border bg-white p-3 dark:border-gray-800 dark:bg-gray-950">
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
