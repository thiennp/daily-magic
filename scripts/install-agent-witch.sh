#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="${HOME}/.agent-witch"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_SCRIPT="${REPO_ROOT}/scripts/agent-witch.ts"
LAUNCH_AGENT_LABEL="com.daily-magic.agent-witch"
PLIST_PATH="${HOME}/Library/LaunchAgents/${LAUNCH_AGENT_LABEL}.plist"
NODE_BIN="$(command -v node)"
NPX_BIN="$(command -v npx)"

if [[ ! -f "${SOURCE_SCRIPT}" ]]; then
  echo "Missing source script: ${SOURCE_SCRIPT}" >&2
  exit 1
fi

if [[ -z "${NODE_BIN}" || -z "${NPX_BIN}" ]]; then
  echo "Node.js and npx are required." >&2
  exit 1
fi

mkdir -p "${INSTALL_DIR}"

cp "${SOURCE_SCRIPT}" "${INSTALL_DIR}/agent-witch.ts"

if [[ ! -f "${INSTALL_DIR}/config.json" ]]; then
  cat > "${INSTALL_DIR}/config.json" <<EOF
{
  "wsUrl": "ws://localhost:3000/api/agent-witch/ws",
  "workspace": "${HOME}",
  "claudeCommand": "claude"
}
EOF
fi

cat > "${INSTALL_DIR}/run.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
cd "${REPO_ROOT}"
exec "${NPX_BIN}" tsx "${INSTALL_DIR}/agent-witch.ts"
EOF
chmod +x "${INSTALL_DIR}/run.sh"

if [[ "$(uname -s)" == "Darwin" ]]; then
  mkdir -p "${HOME}/Library/LaunchAgents"
  cat > "${PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${INSTALL_DIR}/run.sh</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${INSTALL_DIR}/agent-witch.log</string>
  <key>StandardErrorPath</key>
  <string>${INSTALL_DIR}/agent-witch.error.log</string>
</dict>
</plist>
EOF

  launchctl bootout "gui/$(id -u)/${LAUNCH_AGENT_LABEL}" >/dev/null 2>&1 || true
  launchctl bootstrap "gui/$(id -u)" "${PLIST_PATH}"
  launchctl enable "gui/$(id -u)/${LAUNCH_AGENT_LABEL}"
  launchctl kickstart -k "gui/$(id -u)/${LAUNCH_AGENT_LABEL}"
  echo "Installed Agent Witch to ${INSTALL_DIR} and registered LaunchAgent ${LAUNCH_AGENT_LABEL}."
else
  echo "Installed Agent Witch to ${INSTALL_DIR}."
  echo "Linux autostart is not configured automatically. Run: ${INSTALL_DIR}/run.sh"
fi

echo "Config: ${INSTALL_DIR}/config.json"
echo "Logs (macOS): ${INSTALL_DIR}/agent-witch.log"
