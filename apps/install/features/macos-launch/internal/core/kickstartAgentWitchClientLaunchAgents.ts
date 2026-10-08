import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

/**
 * Kickstart the main client LaunchAgent(s) after a lease conflict or bundle update.
 * launchctl exists only on macOS; any other platform returns no kicked labels.
 */
export const kickstartAgentWitchClientLaunchAgents = async (
  installDir: string = resolveAgentWitchInstallDir(),
  platform: string = process.platform,
  options?: { readonly onlyAccountEmail?: string | null },
): Promise<readonly string[]> => {
  if (platform !== "darwin") {
    return [];
  }

  const kicked: string[] = [];

  for (const target of listAgentWitchLaunchTargets(installDir, options)) {
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
