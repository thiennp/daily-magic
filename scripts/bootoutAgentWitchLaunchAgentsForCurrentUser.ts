import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { collectAgentWitchLaunchAgentLabels } from "./agentWitchUninstallLocal";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

export const bootoutAgentWitchLaunchAgentsForCurrentUser = (
  installDir: string = resolveAgentWitchInstallDir(),
): void => {
  for (const launchAgentLabel of collectAgentWitchLaunchAgentLabels(
    installDir,
  )) {
    bootoutAgentWitchLaunchAgentSync(launchAgentLabel);
  }
};
