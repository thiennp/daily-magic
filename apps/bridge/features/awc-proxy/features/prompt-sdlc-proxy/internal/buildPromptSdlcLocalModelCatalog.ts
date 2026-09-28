import {
  listInstalledOllamaChatModels,
  type HarnessWriterAgentId,
} from "../../../../../adapters/promptSdlcProxy";

const WRITER_LABELS: Record<HarnessWriterAgentId, string> = {
  "claude-cli": "Claude (terminal)",
  codex: "Codex (ChatGPT)",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

export const buildPromptSdlcLocalModelCatalog = (input: {
  readonly installedWriterIds: readonly HarnessWriterAgentId[];
  readonly ollamaModels: readonly string[];
}): {
  readonly writers: readonly { readonly id: string; readonly label: string }[];
  readonly ollamaModels: readonly string[];
} => ({
  writers: input.installedWriterIds.map((writerId) => ({
    id: writerId,
    label: WRITER_LABELS[writerId],
  })),
  ollamaModels: listInstalledOllamaChatModels(input.ollamaModels),
});
