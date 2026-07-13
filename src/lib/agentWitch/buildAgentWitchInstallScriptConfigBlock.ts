export const buildAgentWitchInstallScriptConfigBlock = (input: {
  readonly wsUrl: string;
}): string => `
PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "console.log(require('crypto').randomBytes(32).toString('hex'))" )"

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
  "\${NODE_BIN}" - "\${CONFIG_PATH}" "\${PROFILE_EMAIL}" <<'NODE'
const fs = require("node:fs");
const crypto = require("node:crypto");
const configPath = process.argv[2];
const profileEmail = process.argv[3] ?? "";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const defaults = {
  claudeCommand: "claude",
  codexCommand: "codex",
  cursorCommand: "cursor",
  antigravityCommand: "agy",
};
if (typeof config.pairingToken !== "string" || config.pairingToken.length === 0) {
  config.pairingToken = crypto.randomBytes(32).toString("hex");
}
if (profileEmail.length > 0 && (typeof config.email !== "string" || config.email.length === 0)) {
  config.email = profileEmail;
}
for (const [key, value] of Object.entries(defaults)) {
  if (typeof config[key] !== "string" || config[key].length === 0) {
    config[key] = value;
  }
}
fs.writeFileSync(configPath, \`\${JSON.stringify(config, null, 2)}\\n\`);
NODE
  PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "console.log(JSON.parse(require('node:fs').readFileSync(process.argv[1], 'utf8')).pairingToken)" "\${CONFIG_PATH}" )"
fi
`;
