export const buildAgentWitchInstallScriptConfigBlock = (input: {
  readonly wsUrl: string;
  readonly repairExistingInstall?: boolean;
}): string => `
PAIRING_TOKEN="\${PRESET_PAIRING_TOKEN}"

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

if [[ ! -f "\${CONFIG_PATH}" ]]; then
  if [[ -n "\${PROFILE_EMAIL}" ]]; then
    cat > "\${CONFIG_PATH}" <<EOF
{
  "email": "\${PROFILE_EMAIL}",
  "wsUrl": "${input.wsUrl}",
  "workspace": "\${HOME}",
  "claudeCommand": "claude",
  "codexCommand": "codex",
  "cursorCommand": "cursor",
  "antigravityCommand": "agy",
  "pairingToken": "\${PAIRING_TOKEN}"
}
EOF
    if [[ ! -f "\${INSTALL_DIR}/active-profile.json" ]]; then
      cat > "\${INSTALL_DIR}/active-profile.json" <<EOF
{
  "email": "\${PROFILE_EMAIL}"
}
EOF
    fi
  else
    cat > "\${CONFIG_PATH}" <<EOF
{
  "wsUrl": "${input.wsUrl}",
  "workspace": "\${HOME}",
  "claudeCommand": "claude",
  "codexCommand": "codex",
  "cursorCommand": "cursor",
  "antigravityCommand": "agy",
  "pairingToken": "\${PAIRING_TOKEN}"
}
EOF
  fi
else
  "\${NODE_BIN}" - "\${CONFIG_PATH}" "\${PROFILE_EMAIL}" "${input.wsUrl}" "\${PAIRING_TOKEN}" <<'NODE'
const fs = require("node:fs");
const configPath = process.argv[2];
const profileEmail = process.argv[3] ?? "";
const wsUrl = process.argv[4] ?? "";
const pairingToken = process.argv[5] ?? "";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (wsUrl.length > 0) {
  config.wsUrl = wsUrl;
}
if (pairingToken.length > 0) {
  config.pairingToken = pairingToken;
}
const defaults = {
  claudeCommand: "claude",
  codexCommand: "codex",
  cursorCommand: "cursor",
  antigravityCommand: "agy",
};
if (profileEmail.length > 0) {
  config.email = profileEmail;
}
for (const [key, value] of Object.entries(defaults)) {
  if (typeof config[key] !== "string" || config[key].length === 0) {
    config[key] = value;
  }
}
fs.writeFileSync(configPath, \`\${JSON.stringify(config, null, 2)}\\n\`);
NODE
fi
`;
