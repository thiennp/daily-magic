export const buildAgentWitchInstallScriptRegisterLaunchAgentFn = (): string => `
register_agent_witch_launch_agent() {
  local label="\$1"
  local plist_path="\$2"
  local domain="gui/\$(id -u)"
  local service_target="\${domain}/\${label}"

  if launchctl print "\${service_target}" >/dev/null 2>&1; then
    launchctl bootout "\${service_target}" 2>/dev/null || true
    sleep 1
  fi

  if ! launchctl bootstrap "\${domain}" "\${plist_path}" 2>/dev/null; then
    if ! launchctl print "\${service_target}" >/dev/null 2>&1; then
      return 1
    fi
  fi

  launchctl enable "\${service_target}" 2>/dev/null || true
  launchctl kickstart -k "\${service_target}" 2>/dev/null
}

`;
