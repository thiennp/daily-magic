import {
  buildAgentWitchClientScriptUrl,
  buildAgentWitchWsUrl,
} from "./buildAgentWitchInstallUrls";
import { isAgentWitchWebSocketSupportedOrigin } from "./isAgentWitchWebSocketSupportedHost";

export const renderInstallAgentWitchScript = (origin: string): string => {
  const wsUrl = buildAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
  const websocketSupportWarning = isAgentWitchWebSocketSupportedOrigin(origin)
    ? ""
    : `
echo "WARNING: ${origin} cannot host Agent Witch WebSockets on Vercel/serverless." >&2
echo "Use a Node deployment with npm run start, or install from http://localhost:3000." >&2
echo "Target WebSocket ${wsUrl} will stay disconnected on this host." >&2
`;

  return `#!/usr/bin/env bash
set -euo pipefail
${websocketSupportWarning}

INSTALL_DIR="\${HOME}/.agent-witch"
CLIENT_SCRIPT_URL="${clientScriptUrl}"
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
  "wsUrl": "${wsUrl}",
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

if [[ "\$(uname -s)" == "Darwin" ]]; then
  mkdir -p "\${HOME}/Library/LaunchAgents"
  cat > "\${PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${NODE_BIN}</string>
    <string>\${TSX_CLI}</string>
    <string>\${INSTALL_DIR}/agent-witch.ts</string>
  </array>
  <key>WorkingDirectory</key>
  <string>\${INSTALL_DIR}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>\${HOME}</string>
    <key>PATH</key>
    <string>\${NODE_DIR}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <dict>
    <key>SuccessfulExit</key>
    <false/>
    <key>Crashed</key>
    <true/>
  </dict>
  <key>ThrottleInterval</key>
  <integer>10</integer>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch.error.log</string>
</dict>
</plist>
EOF

  if launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" >/dev/null 2>&1; then
    launchctl bootout "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" || true
    sleep 1
  fi

  launchctl bootstrap "gui/\$(id -u)" "\${PLIST_PATH}"
  launchctl enable "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}"
  launchctl kickstart -k "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}"
  sleep 2

  if launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" | grep -q 'state = running'; then
    echo "Agent Witch is running and will auto-reconnect to ${wsUrl}"
  else
    echo "Agent Witch LaunchAgent installed. Check logs if it is not running yet." >&2
  fi
else
  echo "Installed Agent Witch to \${INSTALL_DIR}."
  echo "Linux autostart is not configured automatically. Run: \${RUN_PATH}"
fi

echo "Installed Agent Witch to \${INSTALL_DIR}"
echo "Config: \${INSTALL_DIR}/config.json"
echo "Pairing token: \${PAIRING_TOKEN}"
echo "Paste this token into the app under Local agent pairing."
echo "Logs (macOS): \${INSTALL_DIR}/agent-witch.log"
echo "The client starts immediately and revives after crashes or disconnects."
`;
};
