export const buildAgentWitchInstallScriptRegisterInstall = (input: {
  readonly appOrigin: string;
}): string => `
DEVICE_HOSTNAME="\$(hostname 2>/dev/null || hostname -s)"
MACOS_USERNAME="\$(id -un 2>/dev/null || whoami)"
DEVICE_HOSTNAME="\$(printf '%s' "\${DEVICE_HOSTNAME}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
MACOS_USERNAME="\$(printf '%s' "\${MACOS_USERNAME}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
if [[ -n "\${DEVICE_HOSTNAME}" && -n "\${MACOS_USERNAME}" ]]; then
  DEVICE_LABEL="\${DEVICE_HOSTNAME}#\${MACOS_USERNAME}"
else
  DEVICE_LABEL="\${DEVICE_HOSTNAME}"
fi
REGISTER_PAYLOAD="\$( "\${NODE_BIN}" -e "
const label = process.argv[1] ?? '';
const token = process.argv[2] ?? '';
process.stdout.write(JSON.stringify({ pairingToken: token, deviceLabel: label }));
" "\${DEVICE_LABEL}" "\${PAIRING_TOKEN}" )"
"\${CURL_BIN}" -fsS -X POST "${input.appOrigin}/api/agent-witch/register-install" \\
  -H "Content-Type: application/json" \\
  -d "\${REGISTER_PAYLOAD}" >/dev/null 2>&1 || true
`;
