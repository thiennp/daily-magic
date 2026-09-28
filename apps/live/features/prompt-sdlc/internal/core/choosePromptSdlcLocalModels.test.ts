import { describe, expect, it } from "vitest";

import {
  choosePromptSdlcLocalModels,
  readPromptSdlcLocalRunModels,
} from "./choosePromptSdlcLocalModels";

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

  it("uses the posted writers when more than one is installed", () => {
    expect(
      readPromptSdlcLocalRunModels(
        ["claude-cli", "codex", "cursor"],
        "cursor",
        "claude-cli",
      ),
    ).toEqual({ judge: "cursor", improver: "claude-cli" });
    expect(
      readPromptSdlcLocalRunModels(["claude-cli", "codex"], "ollama", "codex"),
    ).toBeNull();
    expect(readPromptSdlcLocalRunModels(["cursor"], null, null)).toEqual({
      judge: "cursor",
      improver: "cursor",
    });
  });
});
