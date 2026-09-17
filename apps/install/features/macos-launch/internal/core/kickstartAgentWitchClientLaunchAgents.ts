import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

/** Kickstart the main client LaunchAgent(s) after a lease conflict or bundle update. */
export const kickstartAgentWitchClientLaunchAgents = async (
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<readonly string[]> => {
  const kicked: string[] = [];

  for (const target of listAgentWitchLaunchTargets(installDir)) {
    const result = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
      installDir,
    );
    if (result.ok) {
      kicked.push(target.launchAgentLabel);
    }
  }

  return kicked;
};
