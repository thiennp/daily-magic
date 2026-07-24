import { buildAgentWitchInstallScriptAutomationScheduler } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationScheduler";
import { buildAgentWitchInstallScriptFinish } from "@/lib/agentWitch/buildAgentWitchInstallScriptFinish";
import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptUpdater } from "@/lib/agentWitch/buildAgentWitchInstallScriptUpdater";
import { buildAgentWitchInstallScriptVersionStamp } from "@/lib/agentWitch/buildAgentWitchInstallScriptVersionStamp";
import { buildAgentWitchInstallScriptWatchdog } from "@/lib/agentWitch/buildAgentWitchInstallScriptWatchdog";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";
import type { AgentWitchInstallBashScriptInput } from "@/lib/agentWitch/AgentWitchInstallBashScriptInput.type";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const buildAgentWitchInstallBashScript = (
  input: AgentWitchInstallBashScriptInput & AgentWitchInstallScriptPreset,
): string => {
  const appHome = resolveAgentWitchAppHome(input.appOrigin);

  return `${buildAgentWitchInstallScriptSetup({
    appOrigin: input.appOrigin,
    wsUrl: input.wsUrl,
    websocketSupportWarning: input.websocketSupportWarning,
    appHome,
    presetPairingToken: input.presetPairingToken,
    presetProfileEmail: input.presetProfileEmail,
    updateExistingInstall: input.updateExistingInstall,
  })}${buildAgentWitchInstallScriptVersionStamp(input.appOrigin)}${buildAgentWitchInstallScriptLaunchAgent()}${buildAgentWitchInstallScriptUpdater(
    {
      installDirName: appHome.installDirName,
    },
  )}${buildAgentWitchInstallScriptAutomationScheduler()}${buildAgentWitchInstallScriptWakeServer(
    {
      installDirName: appHome.installDirName,
    },
  )}${buildAgentWitchInstallScriptWatchdog({
    installDirName: appHome.installDirName,
  })}${buildAgentWitchInstallScriptFinish({ appOrigin: input.appOrigin })}`;
};
