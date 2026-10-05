import {
  applyProjectComputerHistoryEvent,
  type ApplyProjectComputerHistoryEventResult,
} from "@/lib/projects/acl/messaging/applyProjectComputerHistoryEvent";
import { releaseProjectMessagesHeldForComputerAck } from "@/lib/projects/acl/messaging/releaseProjectMessagesHeldForComputerAck";

/**
 * Owner toggle. On: off → on_configuring (the only way out of off).
 * Off: every state → off, and messages held only for a computerAck are
 * released at once so today's delete rules apply again.
 */
export const toggleProjectComputerHistory = async (input: {
  readonly projectId: string;
  readonly enabled: boolean;
}): Promise<ApplyProjectComputerHistoryEventResult> => {
  const result = await applyProjectComputerHistoryEvent({
    projectId: input.projectId,
    event: input.enabled ? "owner_enable" : "owner_disable",
  });
  if (result.ok && result.state === "off") {
    await releaseProjectMessagesHeldForComputerAck({
      projectId: input.projectId,
    });
  }
  return result;
};
