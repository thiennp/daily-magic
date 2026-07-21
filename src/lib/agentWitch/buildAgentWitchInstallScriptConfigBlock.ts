export const buildAgentWitchInstallScriptConfigBlock = (input: {
  readonly wsUrl: string;
}): string => `
PAIRING_TOKEN="\${PRESET_PAIRING_TOKEN}"

if [[ -z "\${PAIRING_TOKEN}" ]]; then
  echo "Install token is required. Open Home, choose Connect this Mac, and copy the install command from there." >&2
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
config.pairingToken = pairingToken;
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
