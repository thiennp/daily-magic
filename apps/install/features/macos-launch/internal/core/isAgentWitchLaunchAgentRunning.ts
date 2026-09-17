import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const isAgentWitchLaunchAgentRunning = async (
  launchAgentLabel: string,
): Promise<boolean> => {
  if (process.platform !== "darwin") {
    return false;
  }

  const uid = process.getuid?.();
  if (uid === undefined) {
    return false;
  }

  try {
    const { stdout } = await execFileAsync("launchctl", [
      "print",
      `gui/${uid}/${launchAgentLabel}`,
    ]);
    return stdout.includes("state = running");
  } catch {
    return false;
  }
};
