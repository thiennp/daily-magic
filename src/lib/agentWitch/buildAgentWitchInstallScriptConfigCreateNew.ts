export const buildAgentWitchInstallScriptConfigCreateNew = (input: {
  readonly wsUrl: string;
}): string => `
# The pairing token in config.json is the computer's credential: owner-only, never world-readable.
umask 077
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
    echo "Leaving active-profile unchanged so another account on this computer keeps wake identity."
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
chmod 600 "\${CONFIG_PATH}" 2>/dev/null || true
chmod 700 "\$(dirname "\${CONFIG_PATH}")" 2>/dev/null || true
`;
