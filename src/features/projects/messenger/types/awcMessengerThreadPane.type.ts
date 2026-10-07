import type { ReactNode } from "react";

import type {
  AwcMessengerBotStatus,
  AwcMessengerOpenThread,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

export interface AwcMessengerThreadPaneProps {
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
  /** P1-S4b "To X" feed switch for the composer (whole ↔ an assistant). */
  readonly feedSwitch?: { readonly key: string; readonly onSelect: (key: string) => void };
  readonly clearAllSlot?: ReactNode;
  /** P1-S3 feed notices (archived, quiet) shown above the timeline on "All". */
  readonly noticesSlot?: ReactNode;
  /** P1-S4a: unread count frozen at open → New marker + jump-to-new on "All". */
  readonly unreadCount?: number;
  readonly onBack: () => void;
  readonly onLoadOlder: () => void;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly chatVisibility?: ProjectTasksChatVisibility;
}
