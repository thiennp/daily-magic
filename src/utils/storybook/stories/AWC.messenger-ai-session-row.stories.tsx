import { AwcMessengerTimelineEntryRow } from "@/features/projects/messenger/public-api/presentation";
import {
  aiSessionCompletedFixture,
  aiSessionFailedFixture,
  entryAt,
  NOW,
} from "@/features/projects/messenger/utils/messengerChatStore.fixtures";

/**
 * Messenger timeline — AI-session rows (History handoff §5).
 * Additive fixtures only; Activity tab unchanged.
 */
export default {
  title: "AWC/Messenger AI session row",
  parameters: { layout: "padded" },
};

const chatNote = entryAt(
  "chat-note-1",
  NOW - 60_000,
  "Can you tighten the Load older copy?",
);

export const TimelineWithAiSessions = () => (
  <div className="flex max-w-lg flex-col gap-3.5 rounded-xl border border-awc-border bg-awc-tile p-4 dark:border-gray-800 dark:bg-white/[0.02]">
    <AwcMessengerTimelineEntryRow
      entry={aiSessionFailedFixture()}
      isMine={false}
    />
    <AwcMessengerTimelineEntryRow entry={chatNote} isMine />
    <AwcMessengerTimelineEntryRow
      entry={aiSessionCompletedFixture()}
      isMine={false}
    />
  </div>
);

export const CompletedWithReportLink = () => (
  <div className="max-w-lg p-4">
    <AwcMessengerTimelineEntryRow
      entry={aiSessionCompletedFixture()}
      isMine={false}
    />
  </div>
);

export const FailedExpandSummary = () => (
  <div className="max-w-lg p-4">
    <AwcMessengerTimelineEntryRow
      entry={aiSessionFailedFixture()}
      isMine={false}
    />
  </div>
);
