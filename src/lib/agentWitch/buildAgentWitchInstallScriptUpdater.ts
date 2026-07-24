import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptUpdater = (input: {
  readonly installDirName: string;
}): string => `
agent_witch_install_step
cat > "\${INSTALL_DIR}/self-update.sh" <<'UPDATER_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
NODE_BIN="\$(command -v node)"
APP_BUNDLE="\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"

if [[ -z "\${NODE_BIN}" || ! -f "\${APP_BUNDLE}" ]]; then
  exit 0
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${APP_BUNDLE}" self-update
UPDATER_EOF
chmod +x "\${INSTALL_DIR}/self-update.sh"

agent_witch_retire_auxiliary_launch_agents
`;
