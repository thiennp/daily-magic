import { buildAgentWitchInstallScriptLinuxNodeRuntime } from "@agent-witch/install-linux-launch";

import {
  AGENT_WITCH_MIN_NODE_MAJOR,
  AGENT_WITCH_MIN_NODE_VERSION_LABEL,
  AGENT_WITCH_NODE_INSTALL_HINT,
} from "@/lib/agentWitch/agentWitchNodeRuntime.constant";
import { buildAgentWitchInstallScriptNodeRuntimeHomebrew } from "@/lib/agentWitch/buildAgentWitchInstallScriptNodeRuntimeHomebrew";

/** Resolves NODE_BIN and enforces supported Node (install / update scripts). */
export const buildAgentWitchInstallScriptNodeRuntime = (): string => `
${buildAgentWitchInstallScriptLinuxNodeRuntime()}
${buildAgentWitchInstallScriptNodeRuntimeHomebrew()}
agent_witch_install_is_noninteractive() {
  if [[ -n "\${CI:-}" || -n "\${AGENT_WITCH_INSTALL_NONINTERACTIVE:-}" ]]; then
    return 0
  fi
  return 1
}

agent_witch_read_yes_no() {
  local prompt="\$1"
  local answer=""
  if agent_witch_install_is_noninteractive; then
    return 1
  fi
  read -r -p "\${prompt} [y/N] " answer || true
  case "\${answer}" in
    y|Y|yes|YES) return 0 ;;
    *) return 1 ;;
  esac
}

agent_witch_node_major() {
  local bin="\$1"
  "\${bin}" -e "process.stdout.write(String(Number.parseInt(process.version.slice(1).split('.')[0] ?? '', 10)))"
}

agent_witch_node_is_supported() {
  local bin="\$1"
  local major
  major="\$(agent_witch_node_major "\${bin}" 2>/dev/null || echo '')"
  if [[ -z "\${major}" || ! "\${major}" =~ ^[0-9]+$ ]]; then
    return 1
  fi
  if (( major < ${AGENT_WITCH_MIN_NODE_MAJOR} )); then
    return 1
  fi
  return 0
}

agent_witch_ensure_node_runtime() {
  NODE_BIN="\$(command -v node || true)"

  if [[ -z "\${NODE_BIN}" ]]; then
    echo "Node.js is required for Agent Witch (minimum ${AGENT_WITCH_MIN_NODE_VERSION_LABEL})." >&2
    if [[ "\$(uname -s)" == "Linux" ]] && agent_witch_try_install_node_via_linux_tarball; then
      return 0
    fi
    if agent_witch_read_yes_no "Install Node.js now using Homebrew?"; then
      agent_witch_try_install_node_via_homebrew || {
        echo "Could not install Node.js automatically." >&2
        exit 1
      }
      NODE_BIN="\$(command -v node || true)"
    else
      echo "Install cancelled. ${AGENT_WITCH_NODE_INSTALL_HINT}" >&2
      exit 1
    fi
  fi

  if [[ -z "\${NODE_BIN}" ]]; then
    echo "Node.js is still not available after install." >&2
    exit 1
  fi

  if agent_witch_node_is_supported "\${NODE_BIN}"; then
    return 0
  fi

  local found_version
  found_version="\$("\${NODE_BIN}" -v 2>/dev/null || echo 'unknown')"
  echo "Node.js ${AGENT_WITCH_MIN_NODE_VERSION_LABEL} or newer is required (found \${found_version})." >&2
  echo "Your current Node version is not supported for Agent Witch." >&2

  if [[ "\$(uname -s)" == "Linux" ]] && agent_witch_try_install_node_via_linux_tarball; then
    return 0
  fi

  if agent_witch_read_yes_no "Upgrade Node.js now using Homebrew?"; then
    agent_witch_try_install_node_via_homebrew || {
      echo "Could not upgrade Node.js automatically." >&2
      exit 1
    }
    NODE_BIN="\$(command -v node || true)"
    if [[ -z "\${NODE_BIN}" ]] || ! agent_witch_node_is_supported "\${NODE_BIN}"; then
      echo "Node.js is still too old or missing after upgrade. ${AGENT_WITCH_NODE_INSTALL_HINT}" >&2
      exit 1
    fi
    return 0
  fi

  echo "Upgrade declined. ${AGENT_WITCH_NODE_INSTALL_HINT}" >&2
  exit 1
}

agent_witch_ensure_node_runtime
`;
