import type { ComputerNotAssignableCause } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";
import { routeResolvedComputerDispatch } from "@/lib/projects/acl/messaging/routeResolvedComputerDispatch";

export type ComputerDispatchFinalResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: 1;
      readonly agentRunId: string;
    }
  | {
      readonly ok: false;
      readonly code: string;
      readonly cause?: ComputerNotAssignableCause;
    };

/**
 * Computer-seat branch shared by member and owner dispatch: route to the
 * agent-run bridge, write the caller's audit on success, and return the final
 * result. Returns null when the primary recipient is not a computer seat so the
 * caller continues on the bot path.
 */
export const routeComputerDispatchWithAudit = async (input: {
  readonly route: Parameters<typeof routeResolvedComputerDispatch>[0];
  readonly audit: (sent: {
    readonly messageId: string;
    readonly agentRunId: string;
  }) => Promise<void>;
}): Promise<ComputerDispatchFinalResult | null> => {
  const computer = await routeResolvedComputerDispatch(input.route);
  if (computer.ok) {
    await input.audit({
      messageId: computer.messageId,
      agentRunId: computer.agentRunId,
    });
    return {
      ok: true,
      messageId: computer.messageId,
      recipientCount: 1,
      agentRunId: computer.agentRunId,
    };
  }
  if (computer.code === "not_computer") {
    return null;
  }
  return { ok: false, code: computer.code, cause: computer.cause };
};
