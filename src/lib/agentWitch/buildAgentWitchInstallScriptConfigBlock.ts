import { buildAgentWitchInstallScriptConfigCreateNew } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigCreateNew";
import { buildAgentWitchInstallScriptConfigUpdateExisting } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigUpdateExisting";
import { buildAgentWitchInstallScriptConfigWarnOtherProfiles } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigWarnOtherProfiles";

export const buildAgentWitchInstallScriptConfigBlock = (input: {
  readonly wsUrl: string;
  readonly repairExistingInstall?: boolean;
}): string => `
PAIRING_TOKEN="\${PRESET_PAIRING_TOKEN:-}"

if [[ -n "\${PRESET_PAIRING_TOKEN:-}" && -z "\${PROFILE_EMAIL}" ]]; then
  echo "Connect this Mac requires your Agent Witch account email in the install command." >&2
  exit 1
fi

if [[ -z "\${PAIRING_TOKEN}" && -f "\${CONFIG_PATH}" ]]; then
  PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.pairingToken === 'string' && parsed.pairingToken.trim().length > 0) {
    process.stdout.write(parsed.pairingToken.trim());
  }
} catch {}
" "\${CONFIG_PATH}" )"
fi

if [[ -z "\${PAIRING_TOKEN}" ]]; then
  if [[ "${input.repairExistingInstall === true ? "1" : "0"}" == "1" ]]; then
    echo "No linked Mac identity found in your local Agent Witch config. Connect this Mac from Home first." >&2
  else
    echo "Install token is required. Open Home, choose Connect this Mac, and copy the install command from there." >&2
  fi
  exit 1
fi
${buildAgentWitchInstallScriptConfigWarnOtherProfiles()}
if [[ ! -f "\${CONFIG_PATH}" ]]; then
${buildAgentWitchInstallScriptConfigCreateNew({ wsUrl: input.wsUrl })}
else
${buildAgentWitchInstallScriptConfigUpdateExisting({ wsUrl: input.wsUrl })}
fi
`;
