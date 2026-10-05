import {
  PROJECT_COMPUTER_HISTORY_ON_STATES,
  type ProjectComputerHistoryState,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

export type ProjectMessageDeleteGateDecision = "allow" | "deny";

export type ProjectMessageDeleteGateInput = {
  readonly featureState: ProjectComputerHistoryState;
  readonly hasComputerAck: boolean;
  /** Result of the caller's own rule (ack recipient, TTL, delete-on-read). */
  readonly existingRuleAllows: boolean;
};

/**
 * Pure delete gate for one project message. The existing rule always has to
 * pass. off adds nothing. Every History ON state (on_configuring, on_ready,
 * degraded) also needs a computerAck. Age never allows a delete while History
 * is ON: overdue un-acked messages are flagged and woken, not deleted.
 */
export const decideProjectMessageDeleteGate = (
  input: ProjectMessageDeleteGateInput,
): ProjectMessageDeleteGateDecision => {
  if (!input.existingRuleAllows) {
    return "deny";
  }
  if (!PROJECT_COMPUTER_HISTORY_ON_STATES.includes(input.featureState)) {
    return "allow";
  }
  return input.hasComputerAck ? "allow" : "deny";
};
