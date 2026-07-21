export const buildAgentWitchInstallScriptRegisterInstall = (input: {
  readonly appOrigin: string;
}): string => `
DEVICE_LABEL="\$(hostname -s 2>/dev/null || hostname)"
REGISTER_PAYLOAD="\$( "\${NODE_BIN}" -e "
const label = process.argv[1] ?? '';
const token = process.argv[2] ?? '';
process.stdout.write(JSON.stringify({ pairingToken: token, deviceLabel: label }));
" "\${DEVICE_LABEL}" "\${PAIRING_TOKEN}" )"
"\${CURL_BIN}" -fsS -X POST "${input.appOrigin}/api/agent-witch/register-install" \\
  -H "Content-Type: application/json" \\
  -d "\${REGISTER_PAYLOAD}" >/dev/null 2>&1 || true
`;
