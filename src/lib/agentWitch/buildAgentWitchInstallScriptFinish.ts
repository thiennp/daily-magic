import { buildAgentWitchInstallScriptRegisterInstall } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterInstall";

export const buildAgentWitchInstallScriptFinish = (input: {
  readonly appOrigin: string;
}): string => `
${buildAgentWitchInstallScriptRegisterInstall(input)}
agent_witch_install_finish_progress
echo "Agent Witch is ready."

if [[ "\$(uname -s)" == "Darwin" && -z "\${AGENT_WITCH_SKIP_OPEN_HOME:-}" ]]; then
  if command -v open >/dev/null 2>&1; then
    LOCAL_TOKEN_HASH="\$(printf '%s' "\${PAIRING_TOKEN}" | shasum -a 256 2>/dev/null | awk '{print \$1}')"
    if [[ -n "\${LOCAL_TOKEN_HASH}" ]]; then
      open "${input.appOrigin}/?awLocalTokenHash=\${LOCAL_TOKEN_HASH}" 2>/dev/null || true
    else
      open "${input.appOrigin}/" 2>/dev/null || true
    fi
  fi
fi
`;
