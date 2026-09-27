import { describe, expect, it } from "vitest";

import { choosePromptSdlcLocalModels } from "./choosePromptSdlcLocalModels";

describe("choosePromptSdlcLocalModels", () => {
  it("picks the best installed judge and a different improver", () => {
    expect(
      choosePromptSdlcLocalModels(["cursor", "ollama", "codex", "claude-cli"]),
    ).toEqual({ judge: "claude-cli", improver: "codex" });
  });

  it("uses the only installed reasoning model for both roles", () => {
    expect(choosePromptSdlcLocalModels(["cursor"])).toEqual({
      judge: "cursor",
      improver: "cursor",
    });
    expect(choosePromptSdlcLocalModels(["qwen2.5:7b"])).toBeNull();
  });
});
