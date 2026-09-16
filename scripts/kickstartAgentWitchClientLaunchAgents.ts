import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

/** Kickstart the main client LaunchAgent(s) after a lease conflict or bundle update. */
export const kickstartAgentWitchClientLaunchAgents = async (
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<readonly string[]> => {
  const kicked: string[] = [];

  for (const target of listAgentWitchLaunchTargets(installDir)) {
    const result = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
    );
    if (result.ok) {
      kicked.push(target.launchAgentLabel);
    }
  }

  return kicked;
};
