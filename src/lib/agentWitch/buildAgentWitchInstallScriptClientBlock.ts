import {
  buildAgentWitchInstallBundleUrl,
  buildAgentWitchInstallDepsArchiveUrl,
} from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";
import {
  AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT,
  AGENT_WITCH_INSTALL_DEPS_ARCHIVE_ARTIFACT,
} from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { buildAgentWitchRunScript } from "@agent-witch/install-layout/presentation";

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

cat > "\${RUN_PATH}" <<'AGENT_WITCH_RUN_SH'
${buildAgentWitchRunScript().trimEnd()}
AGENT_WITCH_RUN_SH
chmod +x "\${RUN_PATH}"
`;
