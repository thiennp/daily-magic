import { AGENT_WITCH_REVIVE_VERIFY_DELAY_MS } from "./agentWitchWatchdogReinstall.constants";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";
import { isAgentWitchLaunchAgentRunning } from "./isAgentWitchLaunchAgentRunning";
import { resolveAgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const sleep = (durationMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });

export const verifyAgentWitchReviveAfterKickstart = async (input: {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly staleAfterMs: number;
  readonly verifyDelayMs?: number;
}): Promise<boolean> => {
  await sleep(input.verifyDelayMs ?? AGENT_WITCH_REVIVE_VERIFY_DELAY_MS);

  const isRunning = await isAgentWitchLaunchAgentRunning(
    input.launchAgentLabel,
  );
  if (!isRunning) {
    return false;
  }

  const layout =
    input.profileEmail === null
      ? resolveAgentWitchLocalLayout()
      : resolveAgentWitchLocalLayout(input.profileEmail);
  const health = readAgentWitchConnectionHealth(layout);

  return !isAgentWitchConnectionHealthStale(health, input.staleAfterMs);
};
