import {
  AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL,
  AGENT_WITCH_MIN_NODE_MAJOR,
  AGENT_WITCH_NODE_INSTALL_HINT,
} from "@/lib/agentWitch/agentWitchNodeRuntime.constant";

/**
 * Preflight Node gate: runs before anything is stopped or removed, so a machine
 * without a usable Node keeps its current install. The embedded installer later
 * prints the softer `node:sqlite` note (pitfall cache) when Node is 20–22.12.
 */
export const buildAgentWitchRepairScriptNodeCheck = (): string => `
awl_repair_check_node() {
  local node_bin found
  node_bin="$(awl_repair_node || true)"
  found="none"
  if [[ -n "\${node_bin}" ]]; then
    found="$("\${node_bin}" -v 2>/dev/null || echo unknown)"
  fi
  if [[ -z "\${node_bin}" ]] || ! "\${node_bin}" -e "process.exit(Number.parseInt(process.versions.node, 10) >= ${AGENT_WITCH_MIN_NODE_MAJOR} ? 0 : 1)" >/dev/null 2>&1; then
    awl_repair_die "AgentWitch Local needs Node.js ${AGENT_WITCH_MIN_NODE_MAJOR} or newer (${AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL}+ for every feature); found \${found}. ${AGENT_WITCH_NODE_INSTALL_HINT}, then run this again. Nothing was changed."
  fi
  awl_repair_log "Node.js: \${found} (\${node_bin})"
}
`;
