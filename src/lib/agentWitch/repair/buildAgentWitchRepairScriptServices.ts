/** Stop/restart AWL the same way the installer and self-update do (launchd, systemd user unit, scoped pkill). */
export const buildAgentWitchRepairScriptServices = (): string => `
# Same targets as the installer, self-update and uninstall: LaunchAgents on macOS,
# the agent-witch.service systemd user unit on Linux/WSL, then install-scoped processes.
AWL_REPAIR_PROCESS_PATTERNS=(
  "\${INSTALL_DIR}/app/agent-witch.js"
  "\${INSTALL_DIR}/app/command/"
  "\${INSTALL_DIR}/agent-witch.ts"
  "\${INSTALL_DIR}/agent-witch.js"
  "\${INSTALL_DIR}/command/"
  "\${INSTALL_DIR}/run.sh"
  "\${INSTALL_DIR}/wake.sh"
  "\${INSTALL_DIR}/watchdog.sh"
)

awl_repair_any_process_left() {
  local pattern
  for pattern in "\${AWL_REPAIR_PROCESS_PATTERNS[@]}"; do
    if pgrep -f -- "\${pattern}" >/dev/null 2>&1; then
      return 0
    fi
  done
  return 1
}

awl_repair_stop_services() {
  AWL_REPAIR_STAGE="stop"
  if awl_repair_truthy "\${AWL_REPAIR_NO_START}"; then
    awl_repair_log "AWL_REPAIR_NO_START=1: not stopping services."
    return 0
  fi
  awl_repair_log "Stopping AgentWitch Local…"
  local uid label plist pattern attempt
  uid="$(id -u)"
  if [[ "\${OS_NAME}" == "Darwin" ]]; then
    for label in "\${LAUNCH_AGENT_PREFIX}" "\${LAUNCH_AGENT_PREFIX}-wake" "\${LAUNCH_AGENT_PREFIX}-live" \\
      "\${LAUNCH_AGENT_PREFIX}-watchdog" "\${LAUNCH_AGENT_PREFIX}-updater" "\${LAUNCH_AGENT_PREFIX}-automation-scheduler"; do
      launchctl bootout "gui/\${uid}/\${label}" >/dev/null 2>&1 || true
    done
    for plist in "\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_PREFIX}."*.plist; do
      [[ -f "\${plist}" ]] || continue
      launchctl bootout "gui/\${uid}/$(basename "\${plist}" .plist)" >/dev/null 2>&1 || true
    done
  elif command -v systemctl >/dev/null 2>&1; then
    systemctl --user stop agent-witch.service >/dev/null 2>&1 || true
  fi
  for pattern in "\${AWL_REPAIR_PROCESS_PATTERNS[@]}"; do
    pkill -f -- "\${pattern}" >/dev/null 2>&1 || true
  done
  for attempt in 1 2 3 4 5 6 7 8 9 10; do
    awl_repair_any_process_left || return 0
    sleep 1
  done
  for pattern in "\${AWL_REPAIR_PROCESS_PATTERNS[@]}"; do
    pkill -9 -f -- "\${pattern}" >/dev/null 2>&1 || true
  done
  if awl_repair_any_process_left; then
    awl_repair_die "An old AgentWitch Local process is still running. Restart the computer, then run the repair again."
  fi
}

awl_repair_restart_services() {
  if awl_repair_truthy "\${AWL_REPAIR_NO_START}"; then
    return 0
  fi
  if [[ "\${OS_NAME}" == "Darwin" ]]; then
    launchctl kickstart -k "gui/$(id -u)/\${LAUNCH_AGENT_PREFIX}" >/dev/null 2>&1 || true
  elif command -v systemctl >/dev/null 2>&1; then
    systemctl --user restart agent-witch.service >/dev/null 2>&1 || true
  fi
}

# NO_START mode: the installer's launchctl/systemctl/brew/ollama/open calls hit no-op shims.
awl_repair_prepare_no_start_shims() {
  local shim_dir="\${AWL_REPAIR_TMP}/no-start-bin" name
  mkdir -p "\${shim_dir}"
  for name in launchctl systemctl brew ollama open; do
    printf '#!/bin/sh\\n[ "$1" = "print" ] && echo "state = running"\\nexit 0\\n' > "\${shim_dir}/\${name}"
    chmod 700 "\${shim_dir}/\${name}"
  done
  printf '%s' "\${shim_dir}"
}
`;
