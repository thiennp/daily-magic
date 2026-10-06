import { PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

/** Join step — 7 (no wake link): Checks on demand. Used by the /join page for poll types only;
 * the full Copy prompt keeps the platform wake step. Copy only. */
export const buildProjectInviteJoinPollStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => {
  const { projectIdHint } = input;
  return [
    "7. Inbox delivery (Checks on demand, no wake link) — after peers summary:",
    `   You cannot receive a wake link, so check the inbox only when your human asks: list_project_inbox { "projectId": "${projectIdHint}" }. Soft limit: at most 1 check per minute. Do not poll on a timer.`,
    "   Tell the owner you check on demand, so replies may take longer.",
    `   ${PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE}`,
    '   MUST ack_project_message { "messageId": "<id>" }.',
  ];
};
