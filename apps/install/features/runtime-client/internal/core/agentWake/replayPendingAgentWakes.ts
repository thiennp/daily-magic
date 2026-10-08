import {
  readAgentTerminalRegistry,
  writeAgentTerminalRegistry,
  type AgentPendingWake,
} from "./agentWakeLocalFiles";

const ENTER_DELAY_MS = 150;

/** One summarizing line; never contains message bodies. */
export const buildPendingReplayLine = (pending: AgentPendingWake): string =>
  pending.count === 1
    ? "[AgentWitch] 1 pending update - check your AgentWitch inbox"
    : `[AgentWitch] ${String(pending.count)} pending updates - check your AgentWitch inbox`;

/**
 * When a terminal binds to a seat that missed wakes, type ONE summary line and
 * clear the pending entry. Returns the number of wakes summarized.
 */
export const replayPendingAgentWakes = (input: {
  readonly installDir: string;
  readonly membershipId: string;
  readonly shellSessionId: string;
  readonly writeInput: (shellSessionId: string, data: string) => boolean;
  readonly schedule: (run: () => void, delayMs: number) => void;
}): number => {
  const registry = readAgentTerminalRegistry(input.installDir);
  const pending = registry.pending[input.membershipId];
  if (pending === undefined || pending.count < 1) return 0;
  if (
    !input.writeInput(input.shellSessionId, buildPendingReplayLine(pending))
  ) {
    return 0;
  }
  input.schedule(
    () => input.writeInput(input.shellSessionId, "\r"),
    ENTER_DELAY_MS,
  );
  writeAgentTerminalRegistry(input.installDir, {
    ...registry,
    pending: Object.fromEntries(
      Object.entries(registry.pending).filter(
        ([id]) => id !== input.membershipId,
      ),
    ),
  });
  return pending.count;
};
