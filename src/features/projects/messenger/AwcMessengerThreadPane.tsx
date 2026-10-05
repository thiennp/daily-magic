"use client";

import AwcMessengerComposer from "@/features/projects/messenger/AwcMessengerComposer";
import AwcMessengerStatusDot from "@/features/projects/messenger/AwcMessengerStatusDot";
import AwcMessengerTimeline from "@/features/projects/messenger/AwcMessengerTimeline";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

interface AwcMessengerThreadPaneProps {
  readonly title: string;
  readonly kindLabel: string;
  readonly status?: AwcMessengerBotStatus;
  readonly thread: AwcMessengerOpenThread | null;
  readonly isLoading: boolean;
  readonly canSend: boolean;
  readonly sending: boolean;
  readonly showBack: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onBack: () => void;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
}

export default function AwcMessengerThreadPane({
  title,
  kindLabel,
  status,
  thread,
  isLoading,
  canSend,
  sending,
  showBack,
  assignees,
  defaultAssigneeMembershipId,
  onBack,
  onSendMessage,
  onSendTask,
}: AwcMessengerThreadPaneProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <section className="flex min-h-0 min-w-0 flex-col bg-white dark:bg-gray-950" aria-label={title}>
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="mb-1 text-sm font-medium text-blue-700 dark:text-blue-300"
              aria-label={copy.a11yBack}
            >
              ← {copy.listHeading}
            </button>
          ) : null}
          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            <span>{kindLabel}</span>
            {status !== undefined ? (
              <>
                <span aria-hidden>·</span>
                <AwcMessengerStatusDot status={status} />
              </>
            ) : null}
          </div>
        </div>
      </div>
      {isLoading ? (
        <p className="p-4 text-xs text-gray-400">{copy.loadingThread}</p>
      ) : null}
      {thread !== null ? (
        <AwcMessengerTimeline entries={thread.entries} />
      ) : null}
      {canSend ? (
        <AwcMessengerComposer
          disabled={sending}
          sending={sending}
          assignees={assignees}
          defaultAssigneeMembershipId={defaultAssigneeMembershipId}
          onSendMessage={onSendMessage}
          onSendTask={onSendTask}
        />
      ) : (
        <p className="border-t border-gray-200 bg-gray-50 px-4 py-3.5 text-center text-sm text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300">
          {copy.viewerBanner}
        </p>
      )}
    </section>
  );
}
