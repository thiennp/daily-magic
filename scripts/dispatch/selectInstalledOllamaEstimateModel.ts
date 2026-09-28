/**
 * Preference for the estimate sidecar. qwen2.5:7b is first because AWI pulls
 * it and a short estimate has to answer within the sidecar timeout. Larger
 * siblings are next when that tag is not installed.
 */
export const OLLAMA_ESTIMATE_MODEL_PREFERENCE = [
  "qwen2.5:7b",
  "qwen2.5:14b",
  "qwen2.5:32b",
  "qwen2.5:3b",
  "llama3.1:8b",
  "llama3.3",
  "llama3.2",
  "mistral",
  "gemma2",
  "phi4",
  "phi3",
] as const;

const isEmbeddingModelName = (name: string): boolean =>
  /embed|minilm|^bge-/i.test(name);

const matchesInstalledModel = (
  installed: string,
  preference: string,
): boolean =>
  installed === preference ||
  installed.startsWith(`${preference}:`) ||
  installed.startsWith(`${preference}-`);

export const parseOllamaListModelNames = (stdout: string): readonly string[] =>
  stdout
    .split("\n")
    .map((line) => line.trim().split(/\s+/)[0] ?? "")
    .filter((name) => name.length > 0 && name !== "NAME");

/** Chat models already installed. Embedding tags are omitted. */
export const listInstalledOllamaChatModels = (
  installedNames: readonly string[],
): readonly string[] =>
  installedNames.filter(
    (name) => name.trim().length > 0 && !isEmbeddingModelName(name),
  );

/** Best chat model that is already installed. Null when only embeddings exist. */
export const selectInstalledOllamaEstimateModel = (
  installedNames: readonly string[],
  requestedModel: string | null,
): string | null => {
  const chatModels = installedNames.filter(
    (name) => name.trim().length > 0 && !isEmbeddingModelName(name),
  );
  const requested = requestedModel?.trim() ?? "";
  if (requested.length > 0) {
    const requestedMatch = chatModels.find((name) =>
      matchesInstalledModel(name, requested),
    );
    if (requestedMatch !== undefined) {
      return requestedMatch;
    }
  }

  for (const preference of OLLAMA_ESTIMATE_MODEL_PREFERENCE) {
    const match = chatModels.find((name) =>
      matchesInstalledModel(name, preference),
    );
    if (match !== undefined) {
      return match;
    }
  }

  return chatModels[0] ?? null;
};
