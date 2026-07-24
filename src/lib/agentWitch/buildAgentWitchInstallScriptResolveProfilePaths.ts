import {
  AGENT_WITCH_LOGS_DIR_NAME,
  AGENT_WITCH_PROFILES_DIR_NAME,
  AGENT_WITCH_PROJECTS_DIR_NAME,
  AGENT_WITCH_REPORTS_DIR_NAME,
} from "@/lib/projects/constants";

/** Resolves PROFILE_EMAIL, PROFILE_DIR, and LOG_DIR from env + active-profile.json. */
export const buildAgentWitchInstallScriptResolveProfilePathsBlock =
  (): string => `
resolve_agent_witch_profile_paths() {
  PROFILE_EMAIL="\${PROFILE_EMAIL:-\${AGENT_WITCH_PROFILE:-\${AGENT_WITCH_EMAIL:-}}}"
  PROFILE_EMAIL="\$(printf '%s' "\${PROFILE_EMAIL}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

  if [[ -z "\${PROFILE_EMAIL}" && -n "\${PRESET_PROFILE_EMAIL:-}" ]]; then
    PROFILE_EMAIL="\${PRESET_PROFILE_EMAIL}"
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
    PROFILE_DIR="\${INSTALL_DIR}/${AGENT_WITCH_PROFILES_DIR_NAME}/\${PROFILE_EMAIL}"
    CONFIG_PATH="\${PROFILE_DIR}/config.json"
    LOG_DIR="\${PROFILE_DIR}/${AGENT_WITCH_LOGS_DIR_NAME}"
    export AGENT_WITCH_PROFILE="\${PROFILE_EMAIL}"
  else
    PROFILE_DIR=""
    CONFIG_PATH="\${INSTALL_DIR}/config.json"
    LOG_DIR="\${INSTALL_DIR}/${AGENT_WITCH_LOGS_DIR_NAME}"
    unset AGENT_WITCH_PROFILE
  fi

  LOG_BASENAME="agent-witch"
  MAIN_LOG_PATH="\${LOG_DIR}/\${LOG_BASENAME}.log"
  ERROR_LOG_PATH="\${LOG_DIR}/\${LOG_BASENAME}.error.log"
}
`;

export const buildAgentWitchInstallScriptEnsureProfileDirectoriesBlock =
  (): string => `
ensure_agent_witch_profile_directories() {
  if [[ -n "\${PROFILE_EMAIL}" ]]; then
    mkdir -p "\${PROFILE_DIR}/harness/sets" "\${PROFILE_DIR}/${AGENT_WITCH_PROJECTS_DIR_NAME}" "\${PROFILE_DIR}/${AGENT_WITCH_REPORTS_DIR_NAME}" "\${LOG_DIR}"
  else
    mkdir -p "\${LOG_DIR}" "\${INSTALL_DIR}/${AGENT_WITCH_REPORTS_DIR_NAME}"
  fi
}
`;
