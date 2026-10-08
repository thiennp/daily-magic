export const buildAgentWitchRunScript = (): string => `#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"

if [[ -x "\${INSTALL_DIR}/.node/bin/node" ]]; then
  NODE_BIN="\${INSTALL_DIR}/.node/bin/node"
  NODE_DIR="\${INSTALL_DIR}/.node/bin"
else
  NODE_BIN="\$(command -v node || echo node)"
  NODE_DIR="\$(dirname "\${NODE_BIN}" || echo /usr/local/bin)"
fi

export PATH="\${HOME}/.local/bin:\${NODE_DIR}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

PROFILE_EMAIL="\${AGENT_WITCH_HOST_ACCOUNT:-\${AGENT_WITCH_PROFILE:-\${AGENT_WITCH_EMAIL:-}}}"
PROFILE_EMAIL="\$(printf '%s' "\${PROFILE_EMAIL}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

if [[ -z "\${PROFILE_EMAIL}" && -n "\${PRESET_PROFILE_EMAIL:-}" ]]; then
  PROFILE_EMAIL="\${PRESET_PROFILE_EMAIL:-}"
fi

if [[ -z "\${PROFILE_EMAIL}" && -f "\${INSTALL_DIR}/active-profile.json" ]]; then
  PROFILE_EMAIL="\$( "\${NODE_BIN}" -e "
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.email === 'string' && parsed.email.trim().length > 0) {
    process.stdout.write(parsed.email.trim().toLowerCase());
  }
} catch {}
" "\${INSTALL_DIR}/active-profile.json" )"
  PROFILE_EMAIL="\$(printf '%s' "\${PROFILE_EMAIL}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
fi

if [[ -n "\${PROFILE_EMAIL}" ]]; then
  export AGENT_WITCH_PROFILE="\${PROFILE_EMAIL}"
  PROFILE_DIR="\${INSTALL_DIR}/profiles/\${PROFILE_EMAIL}"
  LOG_DIR="\${PROFILE_DIR}/logs"
  mkdir -p "\${PROFILE_DIR}/harness/sets" "\${PROFILE_DIR}/projects" "\${PROFILE_DIR}/reports" "\${LOG_DIR}"
else
  unset AGENT_WITCH_PROFILE
  LOG_DIR="\${INSTALL_DIR}/logs"
  mkdir -p "\${LOG_DIR}" "\${INSTALL_DIR}/reports"
fi

MAIN_LOG_PATH="\${LOG_DIR}/agent-witch.log"
ERROR_LOG_PATH="\${LOG_DIR}/agent-witch.error.log"

cd "\${INSTALL_DIR}"
APP_DIR="\${INSTALL_DIR}/app"

exec >>"\${MAIN_LOG_PATH}" 2> >(
  while IFS= read -r line || [ -n "\${line}" ]; do
    printf '%s %s\\n' "\$(date -u +%Y-%m-%dT%H:%M:%SZ)" "\${line}"
  done >> "\${ERROR_LOG_PATH}"
)

exec "\${NODE_BIN}" "\${APP_DIR}/agent-witch.js"
`;
