import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * Prefer the open-session Mac/AI when still valid. A persisted error session can
 * keep a revoked or removed device id — never lock dispatch to that id.
 */
export const resolveAgentSessionTargets = (input: {
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly sessionDeviceId: string | null;
  readonly selectedDeviceId: string;
  readonly availableDeviceIds?: ReadonlySet<string> | readonly string[];
}): {
  readonly activeWriterAgent: HarnessWriterAgent;
  readonly activeDeviceId: string;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
} => {
  const available =
    input.availableDeviceIds === undefined
      ? null
      : input.availableDeviceIds instanceof Set
        ? input.availableDeviceIds
        : new Set(input.availableDeviceIds);
  const sessionDeviceStillAvailable =
    input.sessionDeviceId !== null &&
    (available === null || available.has(input.sessionDeviceId));
  const activeDeviceId = sessionDeviceStillAvailable
    ? (input.sessionDeviceId as string)
    : input.selectedDeviceId;

  return {
    activeWriterAgent: input.sessionWriterAgent ?? input.writerAgent,
    activeDeviceId,
    isWriterAgentLocked: input.sessionWriterAgent !== null,
    isMacDeviceLocked: sessionDeviceStillAvailable,
  };
};
