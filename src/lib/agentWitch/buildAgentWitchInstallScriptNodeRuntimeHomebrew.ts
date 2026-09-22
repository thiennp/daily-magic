import { AGENT_WITCH_NODE_INSTALL_HINT } from "@/lib/agentWitch/agentWitchNodeRuntime.constant";

export const buildAgentWitchInstallScriptNodeRuntimeHomebrew = (): string => `
agent_witch_try_install_node_via_homebrew() {
  local brew_bin
  brew_bin="\$(command -v brew || true)"
  if [[ -z "\${brew_bin}" ]]; then
    echo "${AGENT_WITCH_NODE_INSTALL_HINT}" >&2
    return 1
  fi
  echo "Installing Node.js via Homebrew (this may take a few minutes)…"
  if ! "\${brew_bin}" install node@22; then
    "\${brew_bin}" install node
  fi
  local node_prefix
  node_prefix="\$("\${brew_bin}" --prefix node@22 2>/dev/null || true)"
  if [[ -n "\${node_prefix}" && -x "\${node_prefix}/bin/node" ]]; then
    export PATH="\${node_prefix}/bin:\${PATH}"
  fi
}
`;
