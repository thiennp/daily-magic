export const buildAgentWitchInstallScriptRegisterInstall = (input: {
  readonly appOrigin: string;
}): string => `
DEVICE_HOSTNAME="\$(hostname 2>/dev/null || hostname -s)"
MACOS_USERNAME="\$(id -un 2>/dev/null || whoami)"
LINUX_USERNAME="\$(id -un 2>/dev/null || whoami)"
DEVICE_HOSTNAME="\$(printf '%s' "\${DEVICE_HOSTNAME}" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
MACOS_USERNAME="\$(printf '%s' "\${MACOS_USERNAME}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
LINUX_USERNAME="\$(printf '%s' "\${LINUX_USERNAME}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
REGISTER_PLATFORM="mac"
if [[ "\$(uname -s)" == "Linux" ]]; then
  REGISTER_PLATFORM="linux"
fi
if [[ "\${REGISTER_PLATFORM}" == "linux" && -n "\${DEVICE_HOSTNAME}" && -n "\${LINUX_USERNAME}" ]]; then
  DEVICE_LABEL="\${DEVICE_HOSTNAME}#\${LINUX_USERNAME}"
elif [[ -n "\${DEVICE_HOSTNAME}" && -n "\${MACOS_USERNAME}" ]]; then
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
const wakePortRaw = process.argv[4] ?? '';
const platformRaw = process.argv[5] ?? 'mac';
const platform = platformRaw === 'linux' ? 'linux' : 'mac';
const payload = { pairingToken: token, deviceLabel: label, platform };
if (bundleVersion.length > 0) {
  payload.installBundleVersion = bundleVersion;
}
if (wakePortRaw.length > 0) {
  const wakePort = Number.parseInt(wakePortRaw, 10);
  if (Number.isFinite(wakePort) && wakePort > 0 && wakePort <= 65535) {
    payload.wakePort = wakePort;
  }
}
process.stdout.write(JSON.stringify(payload));
" "\${DEVICE_LABEL}" "\${PAIRING_TOKEN}" "\${INSTALL_BUNDLE_VERSION}" "\${AGENT_WITCH_WAKE_PORT}" "\${REGISTER_PLATFORM}" )"
REGISTER_BODY_FILE="\$(mktemp "\${TMPDIR:-/tmp}/agent-witch-register.XXXXXX")"
REGISTER_HTTP_CODE="\$(
  "\${CURL_BIN}" -sS -o "\${REGISTER_BODY_FILE}" -w "%{http_code}" -X POST "${input.appOrigin}/api/agent-witch/register-install" \\
    -H "Content-Type: application/json" \\
    -d "\${REGISTER_PAYLOAD}"
)"
# HOME-065 Soft HOLD: never mask cloud 404/409 (revoked/invalid install token).
if [[ "\${REGISTER_HTTP_CODE}" == "404" || "\${REGISTER_HTTP_CODE}" == "409" ]]; then
  echo "Connect failed: register-install returned HTTP \${REGISTER_HTTP_CODE}." >&2
  echo "This install token is invalid or revoked. Open Home → Connect this computer for a fresh command." >&2
  rm -f "\${REGISTER_BODY_FILE}"
  exit 1
fi
if [[ "\${REGISTER_HTTP_CODE}" != "200" && "\${REGISTER_HTTP_CODE}" != "201" ]]; then
  echo "Connect failed: register-install returned HTTP \${REGISTER_HTTP_CODE:-000}." >&2
  echo "Open Home → Connect this computer and run the command again." >&2
  rm -f "\${REGISTER_BODY_FILE}"
  exit 1
fi
rm -f "\${REGISTER_BODY_FILE}"
`;
