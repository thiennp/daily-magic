/** Preflight (install + identity present, latest version) and the already-healthy no-op check. */
export const buildAgentWitchRepairScriptPreflight = (): string => `
awl_repair_fetch_target_version() {
  local body
  body="$(curl -fsSL --max-time 20 "\${AWL_REPAIR_ORIGIN}/install/agent-witch/version")" || return 1
  printf '%s' "\${body}" | awl_repair_bundle_version
}

# Reads only non-secret fields from GET /health (its body also carries a link code).
awl_repair_health_ok() {
  local body node_bin
  body="$(curl -fsS --max-time 3 "\${AWL_REPAIR_HEALTH_URL}" 2>/dev/null)" || return 1
  node_bin="$(awl_repair_node)" || return 1
  printf '%s' "\${body}" | "\${node_bin}" -e '
const fs = require("node:fs");
try {
  const health = JSON.parse(fs.readFileSync(0, "utf8"));
  const uidOk = typeof health.osUid !== "number" || health.osUid === Number(process.argv[1]);
  const rootOk = typeof health.installRootName !== "string" || health.installRootName === process.argv[2];
  process.exit(health.ok === true && uidOk && rootOk ? 0 : 1);
} catch { process.exit(1); }' "$(id -u)" "$(basename "\${INSTALL_DIR}")"
}

awl_repair_app_present() {
  [[ -s "\${INSTALL_DIR}/app/agent-witch.js" && -d "\${INSTALL_DIR}/app/deps" && -x "\${INSTALL_DIR}/app/command/run.sh" ]]
}

awl_repair_preflight() {
  AWL_REPAIR_STAGE="preflight"
  case "\${OS_NAME}" in
    Darwin|Linux) ;;
    *) awl_repair_die "Unsupported OS \${OS_NAME}. On Windows, run the repair inside WSL." ;;
  esac
  command -v curl >/dev/null 2>&1 || awl_repair_die "curl is required."
  if [[ ! -d "\${INSTALL_DIR}" ]]; then
    awl_repair_die "No AgentWitch Local install at \${INSTALL_DIR}. Use Connect this computer on Home to install it."
  fi
  if [[ -z "$(awl_repair_identity_files)" ]]; then
    awl_repair_die "No paired identity in \${INSTALL_DIR}. Use Connect this computer on Home to install and pair."
  fi
  VERSION_BEFORE="$(awl_repair_installed_version)"
  VERSION_BEFORE="\${VERSION_BEFORE:-unknown}"
  VERSION_AFTER="\${VERSION_BEFORE}"
  VERSION_TARGET="$(awl_repair_fetch_target_version || true)"
  if [[ -z "\${VERSION_TARGET}" ]]; then
    VERSION_TARGET="unknown"
    awl_repair_die "Could not read the latest version from \${AWL_REPAIR_ORIGIN}/install/agent-witch/version."
  fi
  awl_repair_describe_identity
  awl_repair_log "Install dir: \${INSTALL_DIR}"
  awl_repair_log "Installed version: \${VERSION_BEFORE}; latest: \${VERSION_TARGET}"
  printf '%s' "\${IDENTITY_REPORT}"
}

# Already on the latest version with app files present and (unless no-start) healthy.
awl_repair_is_already_healthy() {
  awl_repair_truthy "\${AWL_REPAIR_FORCE}" && return 1
  [[ "\${VERSION_BEFORE}" == "\${VERSION_TARGET}" ]] || return 1
  awl_repair_app_present || return 1
  if awl_repair_truthy "\${AWL_REPAIR_NO_START}"; then
    HEALTH_STATUS="skipped (AWL_REPAIR_NO_START=1)"
    return 0
  fi
  if awl_repair_health_ok; then
    HEALTH_STATUS="ok (\${AWL_REPAIR_HEALTH_URL})"
    return 0
  fi
  return 1
}
`;
