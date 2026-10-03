import {
  formatProjectMessageNewFrom,
  formatProjectMessageSending,
} from "@/features/projects/access/inbox/awcProjectMessageStatusCopy.constant";

export type ProjectMessageClientSendPhase = "in_flight" | "dispatch_accepted";

/**
 * Client-known states only.
 * in_flight: send not yet accepted.
 * dispatch_accepted: POST succeeded — new message, not processing.
 * Started-processing is intentionally not resolved here.
 */
export const resolveProjectMessageClientStatus = (input: {
  readonly phase: ProjectMessageClientSendPhase;
  readonly senderDisplayName: string;
}): string => {
  if (input.phase === "in_flight") {
    return formatProjectMessageSending(input.senderDisplayName);
  }
  return formatProjectMessageNewFrom(input.senderDisplayName);
};
