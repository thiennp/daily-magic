/** Verify installed version == latest bundleVersion and /health, then the main entry point. */
export const buildAgentWitchRepairScriptVerify = (): string => `
awl_repair_verify() {
  AWL_REPAIR_STAGE="verify"
  local waited=0
  VERSION_AFTER="$(awl_repair_installed_version)"
  VERSION_AFTER="\${VERSION_AFTER:-none}"
  if [[ "\${VERSION_AFTER}" != "\${VERSION_TARGET}" ]]; then
    awl_repair_die "Installed version \${VERSION_AFTER} does not match latest \${VERSION_TARGET}."
  fi
  awl_repair_app_present || awl_repair_die "App files are incomplete under \${INSTALL_DIR}/app."
  if awl_repair_truthy "\${AWL_REPAIR_NO_START}"; then
    HEALTH_STATUS="skipped (AWL_REPAIR_NO_START=1)"
    return 0
  fi
  awl_repair_log "Waiting for \${AWL_REPAIR_HEALTH_URL}…"
  while (( waited < AWL_REPAIR_HEALTH_TIMEOUT )); do
    if awl_repair_health_ok; then
      HEALTH_STATUS="ok (\${AWL_REPAIR_HEALTH_URL})"
      return 0
    fi
    sleep 2
    waited=$((waited + 2))
  done
  HEALTH_STATUS="no response after \${AWL_REPAIR_HEALTH_TIMEOUT}s (\${AWL_REPAIR_HEALTH_URL})"
  if [[ "\${OS_NAME}" == "Linux" ]] && ! systemctl --user is-active agent-witch.service >/dev/null 2>&1; then
    awl_repair_warn "agent-witch.service is not active. On WSL, enable systemd (/etc/wsl.conf [boot] systemd=true) or run \${INSTALL_DIR}/app/command/run.sh."
  fi
  awl_repair_die "AgentWitch Local did not answer its health check. Logs: \${INSTALL_DIR}/profiles/<email>/logs or \${INSTALL_DIR}/logs."
}

awl_repair_main() {
  awl_repair_preflight
  if awl_repair_is_already_healthy; then
    AWL_REPAIR_RESULT="already healthy"
    awl_repair_log "Already on the latest version (\${VERSION_TARGET}) and healthy. Nothing to repair."
    return 0
  fi
  AWL_REPAIR_TMP="$(mktemp -d "\${TMPDIR:-/tmp}/awl-repair.XXXXXX")"
  awl_repair_stop_services
  awl_repair_backup
  awl_repair_remove_broken_install
  local install_ok=1
  awl_repair_reinstall || install_ok=0
  awl_repair_restore_identity
  if [[ "\${install_ok}" != "1" ]]; then
    AWL_REPAIR_STAGE="reinstall"
    VERSION_AFTER="$(awl_repair_installed_version)"
    VERSION_AFTER="\${VERSION_AFTER:-none}"
    awl_repair_die "Reinstall did not finish."
  fi
  awl_repair_verify
  awl_repair_log "Repair finished."
}

awl_repair_main "$@"
`;
