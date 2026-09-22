import { AGENT_WITCH_LINUX_NODE_LTS_VERSION } from "../../public-api/types";

/** Installs pinned Node LTS under INSTALL_DIR/.node on Linux x64 when system Node is missing/too old. */
export const buildAgentWitchInstallScriptLinuxNodeRuntime = (): string => `
agent_witch_try_install_node_via_linux_tarball() {
  if [[ "\$(uname -s)" != "Linux" ]]; then
    return 1
  fi
  if [[ "\$(uname -m)" != "x86_64" ]]; then
    echo "Agent Witch Linux host v1 supports x86_64 only." >&2
    return 1
  fi

  local node_dir="\${INSTALL_DIR}/.node"
  local node_bin="\${node_dir}/bin/node"
  if [[ -x "\${node_bin}" ]] && agent_witch_node_is_supported "\${node_bin}"; then
    export PATH="\${node_dir}/bin:\${PATH}"
    NODE_BIN="\${node_bin}"
    return 0
  fi

  local version="${AGENT_WITCH_LINUX_NODE_LTS_VERSION}"
  local dist="node-\${version}-linux-x64"
  local tarball="\${dist}.tar.xz"
  local url="https://nodejs.org/dist/\${version}/\${tarball}"
  local tmp="\${INSTALL_DIR}/.node-download"

  rm -rf "\${tmp}" "\${node_dir}"
  mkdir -p "\${tmp}"
  echo "Downloading Node.js \${version} for Linux x64…"
  "\${CURL_BIN}" -fsSL "\${url}" -o "\${tmp}/\${tarball}"
  tar -xJf "\${tmp}/\${tarball}" -C "\${tmp}"
  mv "\${tmp}/\${dist}" "\${node_dir}"
  rm -rf "\${tmp}"

  if [[ ! -x "\${node_bin}" ]]; then
    echo "Node.js unpack failed under \${node_dir}." >&2
    return 1
  fi

  export PATH="\${node_dir}/bin:\${PATH}"
  NODE_BIN="\${node_bin}"
  return 0
}
`;
