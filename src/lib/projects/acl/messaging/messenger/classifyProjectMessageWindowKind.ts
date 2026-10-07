import {
  PROJECT_MESSENGER_KIND_AI_SESSION,
  PROJECT_MESSENGER_KIND_NEEDS_REPLY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import {
  PROJECT_MESSAGE_KIND_APPROVAL_REQUEST,
  PROJECT_MESSAGE_KIND_APPROVAL_RESULT,
  PROJECT_MESSAGE_NOTICE_KINDS,
  PROJECT_MESSAGE_TASK_UPDATE_KINDS,
  type ProjectMessageWindowKind,
} from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerPartyKind } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * DESIGN §3.1 classifier, limited to the message kinds that exist today.
 * It is pure, so OW1 can reuse it for set-on-write and backfill later.
 * Order: approval_*, notice, task_update, task, bot_to_bot, chat.
 * - approval_request / approval_result: reserved approval.* kinds (no writer
 *   yet; AI session rows get theirs from projectMessengerApprovalOf)
 * - notice: system sender, or a silence/lifecycle kind
 * - task_update: task.processing/received/status/done/blocked
 * - task: task.assign (human "Needs a reply") or an AI session row (agent_runs)
 * - bot_to_bot: bot to bot (no mentions exist yet)
 * - chat: everything else (chat.note, plain human/bot lines)
 */
export const classifyProjectMessageWindowKind = (input: {
  readonly kind: string;
  readonly senderKind: ProjectMessengerPartyKind;
  readonly recipientKind: ProjectMessengerPartyKind | "none";
}): ProjectMessageWindowKind => {
  if (input.kind === PROJECT_MESSAGE_KIND_APPROVAL_REQUEST) {
    return "approval_request";
  }
  if (input.kind === PROJECT_MESSAGE_KIND_APPROVAL_RESULT) {
    return "approval_result";
  }
  if (
    input.senderKind === "system" ||
    PROJECT_MESSAGE_NOTICE_KINDS.includes(input.kind)
  ) {
    return "notice";
  }
  if (PROJECT_MESSAGE_TASK_UPDATE_KINDS.includes(input.kind)) {
    return "task_update";
  }
  if (
    input.kind === PROJECT_MESSENGER_KIND_NEEDS_REPLY ||
    input.kind === PROJECT_MESSENGER_KIND_AI_SESSION
  ) {
    return "task";
  }
  if (input.senderKind === "bot" && input.recipientKind === "bot") {
    return "bot_to_bot";
  }
  return "chat";
};
