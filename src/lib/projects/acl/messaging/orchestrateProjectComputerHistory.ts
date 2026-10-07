import { assertCloudMessageStorage } from "@/lib/billing/assertCloudMessageStorage";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { acceptProjectMessageComputerAck } from "@/lib/projects/acl/messaging/acceptProjectMessageComputerAck";
import { authorizeProjectComputer } from "@/lib/projects/acl/messaging/authorizeProjectComputer";
import { listProjectComputerHistoryBacklog } from "@/lib/projects/acl/messaging/listProjectComputerHistoryBacklog";
import type {
  ProjectComputerHistoryCommand,
  ProjectComputerHistoryCommandResult,
} from "@/lib/projects/acl/messaging/projectComputerHistoryCommand.types";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";
import { readProjectComputerHistoryUnsavedOverdue } from "@/lib/projects/acl/messaging/readProjectComputerHistoryUnsavedOverdue";
import { reportProjectComputerHistoryState } from "@/lib/projects/acl/messaging/reportProjectComputerHistoryState";
import { toggleProjectComputerHistory } from "@/lib/projects/acl/messaging/toggleProjectComputerHistory";

export { PROJECT_COMPUTER_HISTORY_UNSAVED_FLAG_AFTER_DAYS } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";

/**
 * Project computer history (cloud half). Opt-in per project; the owner's Mac
 * (AWL) saves each project message locally, then posts a computerAck.
 *
 * States (projectComputerHistoryStateMachine.ts), default on_configuring
 * (no row / unset = ON; explicit off stays off):
 *   off → on_configuring      owner toggle only, never automatic
 *   on_configuring → on_ready AWL on the project computer reports "ready"
 *   on_ready → degraded       computer offline on notify, or reports "degraded"
 *   degraded → on_ready       once no message is left without a computerAck
 *   every state → off         owner toggle; held messages released at once
 * "summarizing" is local-only, not a cloud state.
 *
 * Delete gate (decideProjectMessageDeleteGate, pure): the existing rule must
 * pass; in on_configuring/on_ready/degraded a computerAck is also required. Age never allows
 * a delete while gated — overdue un-acked messages are exposed as
 * unsavedOverdue on owner reads and woken via notifyProjectComputerOfMessage
 * (throttled; see wakeProjectComputersForUnsavedOverdue).
 * Wired in: ackProjectMessage and delete-on-read via gateProjectMessageDelete;
 * TTL purge excludes gated projects and runs the unsaved wake instead.
 * Notify: insertProjectMessageWithDeliveries → notifyProjectComputerOfMessage.
 *
 * No API key, CLI secret, or summarizer credential ever reaches the cloud:
 * reports are an enum, acks are ids.
 */
export const orchestrateProjectComputerHistory = async (
  command: ProjectComputerHistoryCommand,
): Promise<ProjectComputerHistoryCommandResult> => {
  const access =
    command.kind === "owner_read" || command.kind === "owner_toggle"
      ? await authorizeProjectOwner(command)
      : await authorizeProjectComputer(command);
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  await ensureProjectAclSchema();
  const { projectId } = command;
  switch (command.kind) {
    case "owner_toggle": {
      if (command.enabled) {
        const storage = await assertCloudMessageStorage({
          userId: command.actorUserId,
        });
        if (!storage.ok) {
          return { ok: false, code: "cloud_message_storage_off" };
        }
      }
      const toggled = await toggleProjectComputerHistory({
        projectId,
        enabled: command.enabled,
      });
      if (!toggled.ok) {
        return toggled;
      }
      return {
        ok: true,
        state: toggled.state,
        unsavedOverdue: await readProjectComputerHistoryUnsavedOverdue({
          projectId,
        }),
      };
    }
    case "computer_report":
      return reportProjectComputerHistoryState({
        projectId,
        report: command.report,
      });
    case "computer_ack": {
      const accepted = await acceptProjectMessageComputerAck({
        projectId,
        messageId: command.messageId,
        deviceId: command.deviceId,
      });
      if (!accepted.ok) {
        return accepted;
      }
      const { state, messageId, alreadyAcked, deleted } = accepted;
      return { ok: true, state, ack: { messageId, alreadyAcked, deleted } };
    }
    case "computer_read":
      return {
        ok: true,
        state: await readProjectComputerHistoryState(projectId),
        backlog: await listProjectComputerHistoryBacklog({ projectId }),
      };
    default:
      return {
        ok: true,
        state: await readProjectComputerHistoryState(projectId),
        unsavedOverdue: await readProjectComputerHistoryUnsavedOverdue({
          projectId,
        }),
      };
  }
};
