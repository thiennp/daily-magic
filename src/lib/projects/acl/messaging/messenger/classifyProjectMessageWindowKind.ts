import {
  PROJECT_MESSENGER_KIND_AI_SESSION,
  PROJECT_MESSENGER_KIND_NEEDS_REPLY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import {
  PROJECT_MESSAGE_NOTICE_KINDS,
  PROJECT_MESSAGE_TASK_UPDATE_KINDS,
  type ProjectMessageWindowKind,
} from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerPartyKind } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/**
 * DESIGN §3.1 classifier, limited to the message kinds that exist today.
 * It is pure, so OW1 can reuse it for set-on-write and backfill later.
 * Order: notice, then task_update, then task, then bot_to_bot, then chat.
 * - notice: system sender, or a silence/lifecycle kind
 * - task_update: task.processing/received/status/done/blocked
 * - task: task.assign (human "Needs a reply") or an AI session row (agent_runs)
 * - bot_to_bot: bot to bot (no mentions exist yet)
 * - chat: everything else (chat.note, plain human/bot lines)
 * No approval_* rows exist on main yet: a run waiting for approval stays a
 * `task` row with subjectState.awaitingApproval.
 */
export const classifyProjectMessageWindowKind = (input: {
  readonly kind: string;
  readonly senderKind: ProjectMessengerPartyKind;
  readonly recipientKind: ProjectMessengerPartyKind | "none";
}): ProjectMessageWindowKind => {
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
