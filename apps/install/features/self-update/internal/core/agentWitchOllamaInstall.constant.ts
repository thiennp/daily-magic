/** Preferred chat model for task time estimates when it is already installed. */
export const AGENT_WITCH_OLLAMA_ESTIMATE_MODEL = "qwen2.5:7b";

/**
 * Small chat model AWI pulls for estimates, and only when the Mac has no chat
 * model at all (any installed chat model is used instead; see
 * `selectInstalledOllamaEstimateModel`).
 */
export const AGENT_WITCH_OLLAMA_ESTIMATE_PULL_MODEL = "qwen2.5:3b";

/** Embedding model for local knowledge and estimate history. */
export const AGENT_WITCH_OLLAMA_EMBED_MODEL = "nomic-embed-text";

export const AGENT_WITCH_OLLAMA_DOWNLOAD_HINT =
  "Install Ollama from https://ollama.com/download";
