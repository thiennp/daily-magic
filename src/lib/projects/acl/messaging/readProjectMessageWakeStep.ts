import type { InsertProjectMessageWithDeliveriesResult } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

/**
 * Wake step adapter. The wake step (wakeProjectMessageGrokRoutines) runs once
 * inside insert, right after the rows are stored. This only reads insert's
 * wakeResults, so a stored message is never woken again.
 */
export const readProjectMessageWakeStep = (
  stored: InsertProjectMessageWithDeliveriesResult,
): readonly ProjectGrokRoutineWakeResult[] => stored.wakeResults;
