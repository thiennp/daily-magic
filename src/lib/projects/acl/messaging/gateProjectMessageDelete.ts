import {
  decideProjectMessageDeleteGate,
  type ProjectMessageDeleteGateDecision,
} from "@/lib/projects/acl/messaging/decideProjectMessageDeleteGate";
import { hasProjectMessageComputerAck } from "@/lib/projects/acl/messaging/hasProjectMessageComputerAck";
import { PROJECT_COMPUTER_HISTORY_ON_STATES } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";

/**
 * Delete gate extension point for any path that hard-deletes one project
 * message (ack, delete-on-read). Loads state and computerAck and returns the
 * pure decideProjectMessageDeleteGate decision. No side effects: the caller
 * owns the DELETE unless the result is "deny".
 * With history off this reads one row and returns the caller's own rule.
 */
export const gateProjectMessageDelete = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly createdAt: Date | string;
  readonly existingRuleAllows: boolean;
  readonly now?: Date;
}): Promise<ProjectMessageDeleteGateDecision> => {
  if (!input.existingRuleAllows) {
    return "deny";
  }
  // createdAt / now kept for callers; age no longer affects the gate.
  void input.createdAt;
  void input.now;
  const featureState = await readProjectComputerHistoryState(input.projectId);
  const hasComputerAck = PROJECT_COMPUTER_HISTORY_ON_STATES.includes(
    featureState,
  )
    ? await hasProjectMessageComputerAck(input)
    : false;
  return decideProjectMessageDeleteGate({
    featureState,
    hasComputerAck,
    existingRuleAllows: true,
  });
};
