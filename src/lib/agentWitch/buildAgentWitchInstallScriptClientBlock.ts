import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";
import { AGENT_WITCH_INSTALL_PACKAGE_JSON } from "@/lib/agentWitch/agentWitchInstallPackageJson";
import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

const shellDirname = (relativePath: string): string => {
  const slashIndex = relativePath.lastIndexOf("/");
  return slashIndex === -1 ? "." : relativePath.slice(0, slashIndex);
};

const buildClientAuxiliaryDownloadLines = (appOrigin: string): string =>
  AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES.map((scriptName) => {
    const targetDir = shellDirname(scriptName);
    return `mkdir -p "\${INSTALL_DIR}/${targetDir}"
"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallAuxiliaryScriptUrl(appOrigin, scriptName)}" -o "\${INSTALL_DIR}/${scriptName}"`;
  }).join("\n");

export const buildAgentWitchInstallScriptClientBlock = (input: {
  readonly appOrigin: string;
  readonly clientScriptUrl: string;
}): string => `
echo "Downloading Agent Witch client from \${CLIENT_SCRIPT_URL}…"
"\${CURL_BIN}" -fsSL "\${CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch.ts"
${buildClientAuxiliaryDownloadLines(input.appOrigin)}

cat > "\${INSTALL_DIR}/package.json" <<EOF
${AGENT_WITCH_INSTALL_PACKAGE_JSON}EOF

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
