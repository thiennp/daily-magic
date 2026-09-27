import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalModelCatalog } from "./buildPromptSdlcLocalModelCatalog";

describe("buildPromptSdlcLocalModelCatalog", () => {
  it("labels installed writers and drops embedding models", () => {
    expect(
      buildPromptSdlcLocalModelCatalog({
        installedWriterIds: ["claude-cli"],
        ollamaModels: ["qwen2.5:7b", "nomic-embed-text:latest"],
      }),
    ).toEqual({
      writers: [{ id: "claude-cli", label: "Claude (terminal)" }],
      ollamaModels: ["qwen2.5:7b"],
    });
  });
});
