const readPairingTokenFromConfigFileNode = `
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.pairingToken === 'string' && parsed.pairingToken.trim().length > 0) {
    process.stdout.write(parsed.pairingToken.trim());
  }
} catch {}
`.trim();

const scanProfileConfigsForPairingTokenNode = `
const fs = require('node:fs');
const path = require('node:path');
const installDir = process.argv[1];
const skipConfigPath = (process.argv[2] || '').trim();
const profilesDir = path.join(installDir, 'profiles');
if (!fs.existsSync(profilesDir)) {
  process.exit(0);
}
for (const entry of fs.readdirSync(profilesDir)) {
  const configPath = path.join(profilesDir, entry, 'config.json');
  if (configPath === skipConfigPath) {
    continue;
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const token =
      typeof parsed.pairingToken === 'string' ? parsed.pairingToken.trim() : '';
    if (token.length > 0) {
      process.stdout.write(token);
      process.exit(0);
    }
  } catch {}
}
`.trim();

/** Bash: populate PAIRING_TOKEN from local config files (profile, legacy root, other profiles). */
export const buildAgentWitchInstallScriptResolveLocalPairingTokenBlock =
  (): string => `
agent_witch_read_pairing_token_from_config_file() {
  local config_file="$1"
  if [[ ! -f "\${config_file}" ]]; then
    return 0
  fi
  "\${NODE_BIN}" -e "${readPairingTokenFromConfigFileNode}" "\${config_file}"
}

agent_witch_resolve_local_pairing_token() {
  if [[ -n "\${PAIRING_TOKEN}" ]]; then
    return 0
  fi

  if [[ -f "\${CONFIG_PATH}" ]]; then
    PAIRING_TOKEN="\$(agent_witch_read_pairing_token_from_config_file "\${CONFIG_PATH}")"
  fi

  if [[ -z "\${PAIRING_TOKEN}" && -f "\${INSTALL_DIR}/config.json" && "\${CONFIG_PATH}" != "\${INSTALL_DIR}/config.json" ]]; then
    PAIRING_TOKEN="\$(agent_witch_read_pairing_token_from_config_file "\${INSTALL_DIR}/config.json")"
  fi

  if [[ -z "\${PAIRING_TOKEN}" ]]; then
    PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "${scanProfileConfigsForPairingTokenNode}" "\${INSTALL_DIR}" "\${CONFIG_PATH}" )"
  fi
}

agent_witch_resolve_local_pairing_token
`;

export const buildAgentWitchInstallScriptPairingTokenRequiredCheck = (input: {
  readonly updateExistingInstall?: boolean;
}): string => {
  const isUpdate = input.updateExistingInstall === true;

  return `
if [[ -z "\${PAIRING_TOKEN}" ]]; then
  if [[ "${isUpdate ? "1" : "0"}" == "1" ]]; then
    local has_local_config=0
    if [[ -f "\${CONFIG_PATH}" ]]; then
      has_local_config=1
    fi
    if [[ -f "\${INSTALL_DIR}/config.json" ]]; then
      has_local_config=1
    fi
    if [[ "\${has_local_config}" == "1" ]]; then
      echo "Warning: no pairing token in local config — updating app files only. Reconnect this Mac from Home if sync stops." >&2
    else
      echo "No linked Mac identity found in your local Agent Witch config. Connect this Mac from Home first." >&2
      exit 1
    fi
  else
    echo "Install token is required. Open Home, choose Connect this Mac, and copy the install command from there." >&2
    exit 1
  fi
fi
`;
};
