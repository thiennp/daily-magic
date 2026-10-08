import type { AgentWitchHostProcessScope } from "@agent-witch/install-layout/types";

/**
 * d5e39215: an account host started by an old run.sh (which hard-coded the
 * installing account's profile) logs into the wrong profile. Once run.sh is
 * current on disk, a macOS account host whose AGENT_WITCH_PROFILE is not its
 * own account exits once so launchd (KeepAlive) relaunches it through the
 * fixed run.sh. The new run.sh always exports its own account, so this
 * cannot loop.
 */
export const shouldRestartForRepairedRunScript = (input: {
  readonly runScriptCurrent: boolean;
  readonly platform: NodeJS.Platform;
  readonly scope: AgentWitchHostProcessScope;
  readonly envProfile: string | undefined;
}): boolean => {
  if (
    !input.runScriptCurrent ||
    input.platform !== "darwin" ||
    input.scope.kind !== "account"
  ) {
    return false;
  }
  const envEmail = (input.envProfile ?? "").trim().toLowerCase();
  return envEmail !== input.scope.email.trim().toLowerCase();
};
