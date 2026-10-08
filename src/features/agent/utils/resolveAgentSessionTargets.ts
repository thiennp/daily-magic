import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * Prefer the open-session Mac/AI when still valid. A persisted error session can
 * keep a revoked or removed device id — never lock dispatch to that id.
 * ed42d8ce: only a live session (a run actually going) locks the computer and
 * the coding tool. A finished, failed, timed-out or stale session used to pin
 * New task to its computer on every route, deep link included.
 */
export const resolveAgentSessionTargets = (input: {
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly sessionDeviceId: string | null;
  readonly selectedDeviceId: string;
  readonly availableDeviceIds?: ReadonlySet<string> | readonly string[];
  /** Omitted = live (older callers); false for an ended or idle session. */
  readonly isSessionLive?: boolean;
}): {
  readonly activeWriterAgent: HarnessWriterAgent;
  readonly activeDeviceId: string;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
} => {
  const isLive = input.isSessionLive !== false;
  const available =
    input.availableDeviceIds === undefined
      ? null
      : input.availableDeviceIds instanceof Set
        ? input.availableDeviceIds
        : new Set(input.availableDeviceIds);
  const sessionDeviceStillAvailable =
    isLive &&
    input.sessionDeviceId !== null &&
    (available === null || available.has(input.sessionDeviceId));
  const activeDeviceId = sessionDeviceStillAvailable
    ? (input.sessionDeviceId as string)
    : input.selectedDeviceId;
  const lockedWriterAgent = isLive ? input.sessionWriterAgent : null;

  return {
    activeWriterAgent: lockedWriterAgent ?? input.writerAgent,
    activeDeviceId,
    isWriterAgentLocked: lockedWriterAgent !== null,
    isMacDeviceLocked: sessionDeviceStillAvailable,
  };
};
