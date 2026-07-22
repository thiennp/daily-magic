export const buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents =
  (): string => `
agent_witch_retire_auxiliary_launch_agents() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    return 0
  fi

  local uid="\$(id -u)"
  local prefix="\${LAUNCH_AGENT_PREFIX}"
  local label
  local plist

  for label in "\${prefix}-wake" "\${prefix}-watchdog" "\${prefix}-updater" "\${prefix}-automation-scheduler"; do
    launchctl bootout "gui/\${uid}/\${label}" 2>/dev/null || true
    rm -f "\${HOME}/Library/LaunchAgents/\${label}.plist"
  done

  # Retire legacy per-email client LaunchAgents; one process owns all profiles.
  for plist in "\${HOME}/Library/LaunchAgents/\${prefix}."*.plist; do
    [[ -f "\${plist}" ]] || continue
    label="\$(basename "\${plist}" .plist)"
    launchctl bootout "gui/\${uid}/\${label}" 2>/dev/null || true
    rm -f "\${plist}"
  done
}
`;
