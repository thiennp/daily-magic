import type { OneWindowSendMessage } from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

export type AwcMessengerComposerRouting = ReturnType<
  typeof useOneWindowComposerRouting
>;

export interface AwcMessengerComposerProps {
  readonly projectId: string;
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly onSendMessage: OneWindowSendMessage;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly routing?: AwcMessengerComposerRouting;
  /** P1-S4b "To X" chip: the open feed and how to switch it. */
  readonly feedSwitch?: {
    readonly key: string;
    readonly onSelect: (key: string) => void;
  };
}
