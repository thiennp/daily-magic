export const buildAgentWitchInstallScriptRegisterLaunchAgentFn = (): string => `
register_agent_witch_launch_agent() {
  local label="\$1"
  local plist_path="\$2"
  local domain="gui/\$(id -u)"
  local service_target="\${domain}/\${label}"

  if grep -q "agent_witch_is_truthy_env" "\${plist_path}" 2>/dev/null; then
    echo "LaunchAgent plist is invalid XML: \${plist_path}" >&2
    return 1
  fi
  if command -v plutil >/dev/null 2>&1; then
    if ! plutil -lint "\${plist_path}" >/dev/null 2>&1; then
      echo "LaunchAgent plist is invalid XML: \${plist_path}" >&2
      return 1
    fi
  fi

  if launchctl print "\${service_target}" >/dev/null 2>&1; then
    launchctl bootout "\${service_target}" 2>/dev/null || true
    sleep 1
  fi

  if ! launchctl bootstrap "\${domain}" "\${plist_path}"; then
    if ! launchctl print "\${service_target}" >/dev/null 2>&1; then
      return 1
    fi
  fi

  launchctl enable "\${service_target}" 2>/dev/null || true
  launchctl kickstart -k "\${service_target}" 2>/dev/null
}

`;
