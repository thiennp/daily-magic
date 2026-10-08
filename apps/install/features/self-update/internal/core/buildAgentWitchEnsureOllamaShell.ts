import {
  AGENT_WITCH_OLLAMA_DOWNLOAD_HINT,
  AGENT_WITCH_OLLAMA_EMBED_MODEL,
  AGENT_WITCH_OLLAMA_ESTIMATE_PULL_MODEL,
} from "./agentWitchOllamaInstall.constant";

/** Bash that installs Ollama, starts it, and pulls the models AgentWitch calls. */
export const buildAgentWitchEnsureOllamaShell = (): string => `
agent_witch_ollama_api_up() {
  curl -fsS --max-time 2 http://127.0.0.1:11434/api/tags >/dev/null 2>&1
}

agent_witch_ensure_ollama_serving() {
  if agent_witch_ollama_api_up; then
    return 0
  fi
  local brew_bin
  brew_bin="\$(command -v brew || true)"
  if [[ -n "\${brew_bin}" ]]; then
    "\${brew_bin}" services start ollama >/dev/null 2>&1 || true
  fi
  if agent_witch_ollama_api_up; then
    return 0
  fi
  if ! command -v ollama >/dev/null 2>&1; then
    echo "Ollama is not on PATH." >&2
    return 1
  fi
  nohup ollama serve >/dev/null 2>&1 &
  local attempt
  for attempt in 1 2 3 4 5 6 7 8 9 10; do
    if agent_witch_ollama_api_up; then
      return 0
    fi
    sleep 1
  done
  echo "Ollama is installed but not responding on http://127.0.0.1:11434." >&2
  return 1
}

agent_witch_ollama_has_model() {
  local model="\$1"
  ollama list 2>/dev/null | awk 'NR>1 { print \$1 }' | grep -Fx "\${model}" >/dev/null 2>&1
}

agent_witch_ollama_has_chat_model() {
  ollama list 2>/dev/null | awk 'NR>1 { print \$1 }' | grep -viE 'embed|minilm|^bge-' | grep -q .
}

agent_witch_ensure_ollama_model() {
  local model="\$1"
  local pull_log="\$2"
  if agent_witch_ollama_has_model "\${model}"; then
    echo "Ollama model \${model} is already present."
    return 0
  fi
  if pgrep -f "ollama pull \${model}" >/dev/null 2>&1; then
    echo "Ollama model \${model} is already being pulled."
    return 0
  fi
  echo "Pulling Ollama model \${model} in the background…"
  nohup ollama pull "\${model}" >>"\${pull_log}" 2>&1 &
}

agent_witch_install_ollama_from_release() {
  if [[ "\$(uname -s)" != "Darwin" ]]; then
    echo "Ollama is missing. ${AGENT_WITCH_OLLAMA_DOWNLOAD_HINT}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS…"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${AGENT_WITCH_OLLAMA_DOWNLOAD_HINT}" >&2
    return 1
  fi
  tar -xzf "\${archive}" -C "\${ollama_home}/ollama"
  rm -f "\${archive}"
  bin="\$(find "\${ollama_home}/ollama" -type f -name ollama | head -n 1)"
  if [[ -z "\${bin}" ]]; then
    echo "Ollama archive did not contain the ollama command." >&2
    return 1
  fi
  chmod +x "\${bin}"
  ln -sfn "\${bin}" "\${HOME}/.local/bin/ollama"
  export PATH="\${HOME}/.local/bin:\${PATH}"
}

agent_witch_ensure_ollama() {
  local ollama_home pull_log
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  pull_log="\${ollama_home}/logs/ollama-pull.log"
  mkdir -p "\${ollama_home}/logs"
  if ! command -v ollama >/dev/null 2>&1; then
    local brew_bin
    brew_bin="\$(command -v brew || true)"
    if [[ -n "\${brew_bin}" ]]; then
      echo "Installing Ollama via Homebrew…"
      "\${brew_bin}" install ollama || true
    fi
    if ! command -v ollama >/dev/null 2>&1; then
      agent_witch_install_ollama_from_release || return 1
    fi
  else
    echo "Ollama is already installed."
  fi
  agent_witch_ensure_ollama_serving || return 1
  agent_witch_ensure_ollama_model "${AGENT_WITCH_OLLAMA_EMBED_MODEL}" "\${pull_log}"
  if agent_witch_ollama_has_chat_model; then
    echo "A local chat model is already installed; skipping the estimate model."
  else
    agent_witch_ensure_ollama_model "${AGENT_WITCH_OLLAMA_ESTIMATE_PULL_MODEL}" "\${pull_log}"
  fi
}
`;

/** Install-script fragment. A failed Ollama install does not abort AgentWitch. */
export const buildAgentWitchInstallScriptOllama = (): string => `
${buildAgentWitchEnsureOllamaShell()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`;
