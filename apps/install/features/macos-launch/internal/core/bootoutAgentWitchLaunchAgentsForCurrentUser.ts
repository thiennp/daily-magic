import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";

import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { collectAgentWitchLaunchAgentLabels } from "./collectAgentWitchLaunchAgentLabels";

export const bootoutAgentWitchLaunchAgentsForCurrentUser = (
  installDir: string = resolveAgentWitchInstallDir(),
): void => {
  for (const launchAgentLabel of collectAgentWitchLaunchAgentLabels(
    installDir,
  )) {
    bootoutAgentWitchLaunchAgentSync(launchAgentLabel);
  }
};
