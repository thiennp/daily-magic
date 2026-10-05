import { execFileSync } from "node:child_process";

import { isHostSideEffectAllowed } from "@agent-witch/shared/host-side-effects";

export const bootoutAgentWitchLaunchAgentSync = (
  launchAgentLabel: string,
): void => {
  if (process.platform !== "darwin") {
    return;
  }

  // Fail closed under Vitest: labels are production, so this would unload the live AWL.
  if (!isHostSideEffectAllowed()) {
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
