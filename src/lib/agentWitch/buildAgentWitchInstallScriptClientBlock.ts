import {
  buildAgentWitchInstallBundleUrl,
  buildAgentWitchInstallDepsArchiveUrl,
} from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";
import {
  buildAgentWitchInstallScriptEnsureProfileDirectoriesBlock,
  buildAgentWitchInstallScriptResolveProfilePathsBlock,
} from "@/lib/agentWitch/buildAgentWitchInstallScriptResolveProfilePaths";
import { AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";
import {
  AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT,
  AGENT_WITCH_INSTALL_DEPS_ARCHIVE_ARTIFACT,
} from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptClientBlock = (input: {
  readonly appOrigin: string;
}): string => `
agent_witch_install_step
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
mkdir -p "\${APP_DIR}"
"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallBundleUrl(input.appOrigin)}" -o "\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"
"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallDepsArchiveUrl(input.appOrigin)}" -o "\${APP_DIR}/${AGENT_WITCH_INSTALL_DEPS_ARCHIVE_ARTIFACT.fileName}"
tar -xzf "\${APP_DIR}/${AGENT_WITCH_INSTALL_DEPS_ARCHIVE_ARTIFACT.fileName}" -C "\${APP_DIR}"
rm -f "\${APP_DIR}/${AGENT_WITCH_INSTALL_DEPS_ARCHIVE_ARTIFACT.fileName}"
rm -rf "\${INSTALL_DIR}/node_modules" "\${INSTALL_DIR}/package.json" "\${INSTALL_DIR}/package-lock.json"

cat > "\${RUN_PATH}" <<EOF
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
AGENT_WITCH_HOME="\${INSTALL_DIR}"
NODE_BIN="\$(command -v node)"
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
${AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT}
${buildAgentWitchInstallScriptResolveProfilePathsBlock()}${buildAgentWitchInstallScriptEnsureProfileDirectoriesBlock()}
resolve_agent_witch_profile_paths
ensure_agent_witch_profile_directories
mkdir -p "\${LOG_DIR}"
cd "\${INSTALL_DIR}"
exec >>"\${MAIN_LOG_PATH}" 2>>"\${ERROR_LOG_PATH}"
exec "\${NODE_BIN}" "\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"
EOF
chmod +x "\${RUN_PATH}"
`;
