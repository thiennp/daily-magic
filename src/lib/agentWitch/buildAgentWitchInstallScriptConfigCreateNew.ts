export const buildAgentWitchInstallScriptConfigCreateNew = (input: {
  readonly wsUrl: string;
}): string => `
if [[ -n "\${PROFILE_EMAIL}" ]]; then
  cat > "\${CONFIG_PATH}" <<EOF
{
  "email": "\${PROFILE_EMAIL}",
  "wsUrl": "${input.wsUrl}",
  "workspace": "\${HOME}",
  "claudeCommand": "claude",
  "codexCommand": "codex",
  "cursorCommand": "cursor",
  "antigravityCommand": "agy",
  "pairingToken": "\${PAIRING_TOKEN}"
}
EOF
  if [[ ! -f "\${INSTALL_DIR}/active-profile.json" ]]; then
    cat > "\${INSTALL_DIR}/active-profile.json" <<EOF
{
  "email": "\${PROFILE_EMAIL}"
}
EOF
  else
    echo "Leaving active-profile unchanged so another account on this Mac keeps wake identity."
  fi
else
  cat > "\${CONFIG_PATH}" <<EOF
{
  "wsUrl": "${input.wsUrl}",
  "workspace": "\${HOME}",
  "claudeCommand": "claude",
  "codexCommand": "codex",
  "cursorCommand": "cursor",
  "antigravityCommand": "agy",
  "pairingToken": "\${PAIRING_TOKEN}"
}
EOF
fi
`;
