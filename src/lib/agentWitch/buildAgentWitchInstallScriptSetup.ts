export const buildAgentWitchInstallScriptSetup = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string => `#!/usr/bin/env bash
set -euo pipefail
${input.websocketSupportWarning}

INSTALL_DIR="\${HOME}/.agent-witch"
CLIENT_SCRIPT_URL="${input.clientScriptUrl}"
LAUNCH_AGENT_LABEL="com.daily-magic.agent-witch"
PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_LABEL}.plist"
NODE_BIN="\$(command -v node)"
CURL_BIN="\$(command -v curl)"

if [[ -z "\${NODE_BIN}" ]]; then
  echo "Node.js is required." >&2
  exit 1
fi

if [[ -z "\${CURL_BIN}" ]]; then
  echo "curl is required." >&2
  exit 1
fi

NODE_DIR="\$(dirname "\${NODE_BIN}")"
RUN_PATH="\${INSTALL_DIR}/run.sh"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"

mkdir -p "\${INSTALL_DIR}"

PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "console.log(require('crypto').randomBytes(32).toString('hex'))" )"

if [[ ! -f "\${INSTALL_DIR}/config.json" ]]; then
  cat > "\${INSTALL_DIR}/config.json" <<EOF
{
  "wsUrl": "${input.wsUrl}",
  "workspace": "\${HOME}",
  "claudeCommand": "claude",
  "pairingToken": "\${PAIRING_TOKEN}"
}
EOF
else
  "\${NODE_BIN}" - "\${INSTALL_DIR}/config.json" <<'NODE'
const fs = require("node:fs");
const configPath = process.argv[1];
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (typeof config.pairingToken !== "string" || config.pairingToken.length === 0) {
  config.pairingToken = require("node:crypto").randomBytes(32).toString("hex");
  fs.writeFileSync(configPath, \`\${JSON.stringify(config, null, 2)}\\n\`);
}
NODE
  PAIRING_TOKEN="\$( "\${NODE_BIN}" -e "console.log(JSON.parse(require('node:fs').readFileSync(process.argv[1], 'utf8')).pairingToken)" "\${INSTALL_DIR}/config.json" )"
fi

echo "Downloading Agent Witch client from \${CLIENT_SCRIPT_URL}…"
"\${CURL_BIN}" -fsSL "\${CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch.ts"

cat > "\${INSTALL_DIR}/package.json" <<EOF
{
  "name": "agent-witch",
  "private": true,
  "type": "module",
  "dependencies": {
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "tsx": "^4.20.3",
    "typescript": "^5"
  }
}
EOF

echo "Installing Agent Witch dependencies in \${INSTALL_DIR}…"
(
  cd "\${INSTALL_DIR}"
  npm install --no-fund --no-audit
)

cat > "\${RUN_PATH}" <<EOF
#!/usr/bin/env bash
set -euo pipefail
export PATH="\${NODE_DIR}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
cd "\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${INSTALL_DIR}/agent-witch.ts"
EOF
chmod +x "\${RUN_PATH}"
`;
