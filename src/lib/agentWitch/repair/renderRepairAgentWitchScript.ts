import { AGENT_WITCH_LOCAL_APP_PORT } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";
import { buildAgentWitchRepairScriptHealth } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptHealth";
import { buildAgentWitchRepairScriptEmbeddedInstaller } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptEmbeddedInstaller";
import { buildAgentWitchRepairScriptBackup } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptBackup";
import { buildAgentWitchRepairScriptIdentity } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptIdentity";
import { buildAgentWitchRepairScriptNodeCheck } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptNodeCheck";
import { buildAgentWitchRepairScriptPreamble } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptPreamble";
import { buildAgentWitchRepairScriptPreflight } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptPreflight";
import { buildAgentWitchRepairScriptReinstall } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptReinstall";
import { buildAgentWitchRepairScriptServices } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptServices";
import { buildAgentWitchRepairScriptVerify } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptVerify";
import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

/**
 * Update + hard-reinstall script served at /install/agent-witch-update.sh (and the
 * legacy /install/agent-witch-repair.sh alias). It embeds the update installer
 * (renderUpdateAgentWitchScript) instead of forking it.
 */
export const renderRepairAgentWitchScript = (origin: string): string => {
  const normalizedOrigin = new URL(origin).origin;
  const appHome = resolveAgentWitchAppHome(normalizedOrigin);
  const input = {
    origin: normalizedOrigin,
    installDirName: appHome.installDirName,
    launchAgentPrefix: appHome.launchAgentPrefix,
    legacyHealthPort: AGENT_WITCH_LOCAL_APP_PORT,
  };

  return [
    buildAgentWitchRepairScriptPreamble(input),
    buildAgentWitchRepairScriptIdentity(),
    buildAgentWitchRepairScriptNodeCheck(),
    buildAgentWitchRepairScriptHealth(),
    buildAgentWitchRepairScriptPreflight(),
    buildAgentWitchRepairScriptServices(),
    buildAgentWitchRepairScriptBackup(),
    buildAgentWitchRepairScriptReinstall(),
    buildAgentWitchRepairScriptEmbeddedInstaller(
      renderUpdateAgentWitchScript(normalizedOrigin),
    ),
    buildAgentWitchRepairScriptVerify(),
  ].join("");
};
