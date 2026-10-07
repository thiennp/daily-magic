/** Preflight (install + identity present, latest version) and the already-healthy no-op check. Health helpers: buildAgentWitchRepairScriptHealth. */
export const buildAgentWitchRepairScriptPreflight = (): string => `
awl_repair_fetch_target_version() {
  local body
  body="$(curl -fsSL --max-time 20 "\${AWL_REPAIR_ORIGIN}/install/agent-witch/version")" || return 1
  printf '%s' "\${body}" | awl_repair_bundle_version
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
  awl_repair_check_node
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
    HEALTH_STATUS="ok ($(awl_repair_health_label))"
    return 0
  fi
  return 1
}
`;
