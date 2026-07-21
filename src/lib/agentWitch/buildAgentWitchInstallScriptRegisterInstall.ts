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
INSTALL_BUNDLE_VERSION="\$( "\${NODE_BIN}" -e "
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.bundleVersion === 'string' && parsed.bundleVersion.trim().length > 0) {
    process.stdout.write(parsed.bundleVersion.trim());
  }
} catch {}
" "\${INSTALL_DIR}/install-version.json" )"
REGISTER_PAYLOAD="\$( "\${NODE_BIN}" -e "
const label = process.argv[1] ?? '';
const token = process.argv[2] ?? '';
const bundleVersion = process.argv[3] ?? '';
const payload = { pairingToken: token, deviceLabel: label };
if (bundleVersion.length > 0) {
  payload.installBundleVersion = bundleVersion;
}
process.stdout.write(JSON.stringify(payload));
" "\${DEVICE_LABEL}" "\${PAIRING_TOKEN}" "\${INSTALL_BUNDLE_VERSION}" )"
"\${CURL_BIN}" -fsS -X POST "${input.appOrigin}/api/agent-witch/register-install" \\
  -H "Content-Type: application/json" \\
  -d "\${REGISTER_PAYLOAD}" >/dev/null 2>&1 || true
`;
