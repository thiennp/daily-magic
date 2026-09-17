import { execFileSync } from "node:child_process";

export const bootoutAgentWitchLaunchAgentSync = (
  launchAgentLabel: string,
): void => {
  if (process.platform !== "darwin") {
    return;
  }

  const uid = process.getuid?.();
  if (uid === undefined) {
    return;
  }

  try {
    execFileSync("launchctl", ["bootout", `gui/${uid}/${launchAgentLabel}`], {
      stdio: "ignore",
    });
  } catch {
    // Already unloaded or not registered.
  }
};
