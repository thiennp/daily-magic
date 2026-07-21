export const buildAgentWitchInstallScriptMacOsConsoleUserGuard = (): string => `
agent_witch_is_active_console_user() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    return 0
  fi

  local console_user current_user
  console_user="$(stat -f '%Su' /dev/console 2>/dev/null || true)"
  current_user="$(id -un)"

  case "\${console_user}" in
    ""|loginwindow|_mbsetupuser|root)
      return 1
      ;;
  esac

  if [[ "\${console_user}" != "\${current_user}" ]]; then
    return 1
  fi

  return 0
}

agent_witch_skip_unless_active_console_user() {
  if agent_witch_is_active_console_user; then
    return 0
  fi

  exit 0
}
`;
