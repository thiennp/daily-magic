import type { ComputerNotAssignableCause } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";
import { assertComputerDispatchAssignable } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";
import { dispatchProjectComputerAgentRun } from "@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";
import type { ParsedProjectDispatch } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";

type ParsedOk = Extract<ParsedProjectDispatch, { readonly ok: true }>;

export type RouteResolvedComputerDispatchResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly agentRunId: string;
      readonly recipientCount: 1;
    }
  | {
      readonly ok: false;
      readonly code: string;
      readonly cause?: ComputerNotAssignableCause;
    }
  | {
      readonly ok: false;
      readonly code: "not_computer";
      readonly cause?: undefined;
    };

const isComputerRecipient = (
  recipient: DispatchRecipient | undefined,
): recipient is DispatchRecipient & {
  readonly id: string;
  readonly deviceId: string;
  readonly memberKind: "computer";
} =>
  recipient?.memberKind === "computer" &&
  typeof recipient.id === "string" &&
  typeof recipient.deviceId === "string" &&
  recipient.deviceId.length > 0;

/**
 * If the primary recipient is a computer seat, gate assignability and bridge
 * to COMMAND_CLAUDE_RUN. Otherwise returns not_computer for the bot path.
 */
export const routeResolvedComputerDispatch = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly primary: DispatchRecipient | undefined;
  readonly parsed: ParsedOk;
}): Promise<RouteResolvedComputerDispatchResult> => {
  if (!isComputerRecipient(input.primary)) {
    return { ok: false, code: "not_computer" };
  }
  const gate = await assertComputerDispatchAssignable({
    deviceId: input.primary.deviceId,
    ownerUserId: input.primary.user_id,
    ...(input.parsed.writerAgent !== undefined
      ? { writerAgent: input.parsed.writerAgent }
      : {}),
  });
  if (!gate.ok) {
    return { ok: false, code: gate.code, cause: gate.cause };
  }
  const bridged = await dispatchProjectComputerAgentRun({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    senderMembershipId: input.senderMembershipId,
    senderProjectDisplayName: input.senderProjectDisplayName,
    membershipId: input.primary.id,
    deviceId: input.primary.deviceId,
    deviceOwnerUserId: input.primary.user_id,
    kind: input.parsed.kind,
    summary: input.parsed.summary,
    refsJson: JSON.stringify(input.parsed.refs),
    toProjectDisplayName: input.parsed.toProjectDisplayName,
    writerAgent: input.parsed.writerAgent,
  });
  if (!bridged.ok) {
    return { ok: false, code: bridged.code };
  }
  return {
    ok: true,
    messageId: bridged.messageId,
    agentRunId: bridged.agentRunId,
    recipientCount: 1,
  };
};
