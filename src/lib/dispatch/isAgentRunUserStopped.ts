import { isStoppedByUserOutput } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { isAgentRunUserStoppedExitCode } from "@/lib/dispatch/agentRunUserStoppedExitCode.constant";

/**
 * Returns true if the run was manually stopped by the user, either from the web UI
 * (resulting in the agent run output ending with "Stopped by user.") or from the
 * local terminal (resulting in an exit code that matches the OS interrupt signal).
 */
export const isAgentRunUserStopped = (
  output: string | null | undefined,
  exitCode: number | null | undefined,
): boolean => {
  if (isAgentRunUserStoppedExitCode(exitCode ?? null)) {
    return true;
  }
  if (isStoppedByUserOutput(output ?? "")) {
    return true;
  }
  return false;
};
