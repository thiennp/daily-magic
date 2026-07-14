import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";

export const buildAgentWitchInstallScriptVersionStamp = (
  appOrigin: string,
): string => `
cat > "\${INSTALL_DIR}/install-version.json" <<EOF
{
  "bundleVersion": "${AGENT_WITCH_INSTALL_BUNDLE_VERSION}",
  "appOrigin": "${appOrigin}",
  "updatedAt": "\$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF
echo "Agent Witch bundle version: ${AGENT_WITCH_INSTALL_BUNDLE_VERSION}"
`;
