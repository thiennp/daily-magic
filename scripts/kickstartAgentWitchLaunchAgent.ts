import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface KickstartLaunchAgentResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export const kickstartAgentWitchLaunchAgent = async (
  launchAgentLabel: string,
): Promise<KickstartLaunchAgentResult> => {
  if (process.platform !== "darwin") {
    return {
      ok: false,
      errorMessage: "launchctl kickstart is only supported on macOS.",
    };
  }

  const uid = process.getuid?.();
  if (uid === undefined) {
    return {
      ok: false,
      errorMessage: "Could not resolve the current user id for launchctl.",
    };
  }

  try {
    await execFileAsync("launchctl", [
      "kickstart",
      "-k",
      `gui/${uid}/${launchAgentLabel}`,
    ]);
    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "launchctl kickstart failed.";
    return { ok: false, errorMessage: message };
  }
};
