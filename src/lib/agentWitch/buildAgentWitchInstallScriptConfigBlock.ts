import { buildAgentWitchInstallScriptConfigCreateNew } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigCreateNew";
import { buildAgentWitchInstallScriptConfigUpdateExisting } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigUpdateExisting";
import { buildAgentWitchInstallScriptConfigWarnOtherProfiles } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigWarnOtherProfiles";
import {
  buildAgentWitchInstallScriptPairingTokenRequiredCheck,
  buildAgentWitchInstallScriptResolveLocalPairingTokenBlock,
} from "@/lib/agentWitch/buildAgentWitchInstallScriptResolveLocalPairingToken";

export const buildAgentWitchInstallScriptConfigBlock = (input: {
  readonly wsUrl: string;
  readonly updateExistingInstall?: boolean;
}): string => `
PAIRING_TOKEN="\${PRESET_PAIRING_TOKEN:-}"

if [[ -n "\${PRESET_PAIRING_TOKEN:-}" && -z "\${PROFILE_EMAIL}" ]]; then
  echo "Connect this Mac requires your Agent Witch account email in the install command." >&2
  exit 1
fi

${buildAgentWitchInstallScriptResolveLocalPairingTokenBlock()}
${buildAgentWitchInstallScriptPairingTokenRequiredCheck({
  updateExistingInstall: input.updateExistingInstall,
})}
${buildAgentWitchInstallScriptConfigWarnOtherProfiles()}
if [[ ! -f "\${CONFIG_PATH}" ]]; then
${buildAgentWitchInstallScriptConfigCreateNew({ wsUrl: input.wsUrl })}
else
${buildAgentWitchInstallScriptConfigUpdateExisting({ wsUrl: input.wsUrl })}
fi
`;
