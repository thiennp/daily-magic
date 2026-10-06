import {
  AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL,
  AGENT_WITCH_NODE_INSTALL_HINT,
} from "@/lib/agentWitch/agentWitchNodeRuntime.constant";

/**
 * One line when NODE_BIN runs AWL but lacks `node:sqlite` (same capability check
 * the bundle uses). Never blocks: AWL starts with the pitfall cache off.
 */
export const buildAgentWitchInstallScriptNodeFeatureNote = (): string => `
agent_witch_note_node_feature_gaps() {
  local bin="\$1"
  if "\${bin}" -e "process.exit(typeof process.getBuiltinModule === 'function' && process.getBuiltinModule('node:sqlite') ? 0 : 1)" >/dev/null 2>&1; then
    return 0
  fi
  echo "Note: Node.js \$("\${bin}" -v 2>/dev/null || echo unknown) runs AgentWitch, but the pitfall cache (check_context) needs Node.js ${AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL} or newer. ${AGENT_WITCH_NODE_INSTALL_HINT}." >&2
}
`;
