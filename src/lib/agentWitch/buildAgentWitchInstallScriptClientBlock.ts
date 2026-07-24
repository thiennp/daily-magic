import { AGENT_WITCH_INSTALL_PACKAGE_JSON } from "@/lib/agentWitch/agentWitchInstallPackageJson";
import { buildAgentWitchInstallBundleUrl } from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";
import { AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";
import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptClientBlock = (input: {
  readonly appOrigin: string;
}): string => `
agent_witch_install_step
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
mkdir -p "\${APP_DIR}"
"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallBundleUrl(input.appOrigin)}" -o "\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"

cat > "\${INSTALL_DIR}/package.json" <<EOF
${AGENT_WITCH_INSTALL_PACKAGE_JSON}EOF

agent_witch_install_step
(
  cd "\${INSTALL_DIR}"
  npm install --no-fund --no-audit >/dev/null
  npm approve-scripts --allow-scripts-pending >/dev/null 2>&1 || true
)

cat > "\${RUN_PATH}" <<EOF
#!/usr/bin/env bash
set -euo pipefail
${AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT}
cd "\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"
EOF
chmod +x "\${RUN_PATH}"
`;
