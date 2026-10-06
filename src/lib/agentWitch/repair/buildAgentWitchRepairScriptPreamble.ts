import type { AgentWitchRepairScriptInput } from "@/lib/agentWitch/repair/AgentWitchRepairScriptInput.type";

/** Repair script header: bash guard, strict mode, env flags, install-path guards and shared helpers. */
export const buildAgentWitchRepairScriptPreamble = (
  input: AgentWitchRepairScriptInput,
): string => `#!/usr/bin/env bash
# AgentWitch Local update + repair (hard reinstall). Wraps the update installer:
# stop -> back up identity -> remove app files -> reinstall -> restore -> verify.
# Safe to re-run. Never prints secrets (only existence + sha256 fingerprints).
if [ -z "\${BASH_VERSION:-}" ]; then
  echo "Run this with bash: curl -fsSL ${input.origin}/install/agent-witch-update.sh | bash" >&2
  exit 1
fi
set -euo pipefail
umask 077

AWL_REPAIR_ORIGIN="\${AWL_REPAIR_ORIGIN:-${input.origin}}"
AWL_REPAIR_ORIGIN="\${AWL_REPAIR_ORIGIN%/}"
AWL_REPAIR_HEALTH_URL="\${AWL_REPAIR_HEALTH_URL:-http://127.0.0.1:${input.healthPort}/health}"
AWL_REPAIR_HEALTH_TIMEOUT="\${AWL_REPAIR_HEALTH_TIMEOUT:-60}"
AWL_REPAIR_NO_START="\${AWL_REPAIR_NO_START:-0}"
AWL_REPAIR_FORCE="\${AWL_REPAIR_FORCE:-0}"
AWL_REPAIR_INSTALLER_FILE="\${AWL_REPAIR_INSTALLER_FILE:-}"
LAUNCH_AGENT_PREFIX="${input.launchAgentPrefix}"
OS_NAME="$(uname -s)"

AWL_REPAIR_RESULT="failed"
AWL_REPAIR_STAGE="preflight"
VERSION_BEFORE="none"
VERSION_TARGET="unknown"
VERSION_AFTER="none"
BACKUP_DIR=""
HEALTH_STATUS="not checked"
IDENTITY_REPORT=""
AWL_REPAIR_TMP=""

awl_repair_log() { printf '[repair] %s\\n' "$*"; }
awl_repair_warn() { printf '[repair] warning: %s\\n' "$*" >&2; }
awl_repair_die() {
  printf '[repair] error: %s\\n' "$*" >&2
  exit 1
}

if [[ -z "\${HOME:-}" || "\${HOME}" != /* || "\${HOME}" == "/" || ! -d "\${HOME}" ]]; then
  awl_repair_die "HOME is not a usable absolute directory."
fi
HOME="\${HOME%/}"
INSTALL_DIR="\${HOME}/${input.installDirName}"
if [[ "\${INSTALL_DIR}" == "\${HOME}" || "\${INSTALL_DIR}" == "/" ]]; then
  awl_repair_die "Refusing unsafe install path."
fi

awl_repair_truthy() {
  case "$(printf '%s' "\${1:-}" | tr '[:upper:]' '[:lower:]')" in
    1|true|yes|on) return 0 ;;
    *) return 1 ;;
  esac
}

awl_repair_sha256() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | awk '{print $1}'
  else
    shasum -a 256 "$1" | awk '{print $1}'
  fi
}

awl_repair_fingerprint() {
  local hash
  hash="$(awl_repair_sha256 "$1")"
  printf 'sha256:%s' "\${hash:0:16}"
}

awl_repair_node() {
  local candidate
  for candidate in "\${INSTALL_DIR}/.node/bin/node" "$(command -v node 2>/dev/null || true)" /opt/homebrew/bin/node /usr/local/bin/node; do
    if [[ -n "\${candidate}" && -x "\${candidate}" ]] && "\${candidate}" -e '' >/dev/null 2>&1; then
      printf '%s' "\${candidate}"
      return 0
    fi
  done
  return 1
}

awl_repair_bundle_version() {
  tr -d '\\n' | sed -n 's/.*"bundleVersion"[[:space:]]*:[[:space:]]*"\\([^"]*\\)".*/\\1/p' | head -n 1
}

awl_repair_installed_version() {
  if [[ -f "\${INSTALL_DIR}/install-version.json" ]]; then
    awl_repair_bundle_version < "\${INSTALL_DIR}/install-version.json"
  fi
}
`;
