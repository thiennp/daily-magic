import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";
import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

const buildClientAuxiliaryDownloadLines = (appOrigin: string): string =>
  AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES.map(
    (scriptName) =>
      `"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallAuxiliaryScriptUrl(appOrigin, scriptName)}" -o "\${INSTALL_DIR}/${scriptName}"`,
  ).join("\n");

export const buildAgentWitchInstallScriptClientBlock = (input: {
  readonly appOrigin: string;
  readonly clientScriptUrl: string;
}): string => `
echo "Downloading Agent Witch client from \${CLIENT_SCRIPT_URL}…"
"\${CURL_BIN}" -fsSL "\${CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch.ts"
${buildClientAuxiliaryDownloadLines(input.appOrigin)}

cat > "\${INSTALL_DIR}/package.json" <<EOF
{
  "name": "agent-witch",
  "private": true,
  "type": "module",
  "dependencies": {
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "tsx": "^4.20.3",
    "typescript": "^5"
  },
  "allowScripts": {
    "esbuild": true,
    "fsevents": true
  }
}
EOF

echo "Installing Agent Witch dependencies in \${INSTALL_DIR}…"
(
  cd "\${INSTALL_DIR}"
  npm install --no-fund --no-audit
  npm approve-scripts --allow-scripts-pending 2>/dev/null || true
)

cat > "\${RUN_PATH}" <<EOF
#!/usr/bin/env bash
set -euo pipefail
${AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT}
cd "\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${INSTALL_DIR}/agent-witch.ts"
EOF
chmod +x "\${RUN_PATH}"
`;
