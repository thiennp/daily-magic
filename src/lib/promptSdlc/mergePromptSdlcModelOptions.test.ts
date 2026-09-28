import { describe, expect, it } from "vitest";

import {
  mergePromptSdlcModelOptions,
  pickPromptSdlcDefaultModelIds,
} from "@/lib/promptSdlc/mergePromptSdlcModelOptions";

describe("mergePromptSdlcModelOptions", () => {
  it("lists installed writers and Cursor Cloud, and leaves out local models", () => {
    const options = mergePromptSdlcModelOptions({
      installedWriterIds: ["cursor", "not-a-writer", "claude-cli"],
      cursorCloudConnected: true,
    });

    expect(options.map((option) => option.id)).toEqual([
      "writer:claude-cli",
      "writer:cursor",
      "writer:cursor-cloud",
    ]);
    expect(options[0]?.label).toBe("Claude (terminal)");
  });

  it("defaults the improver to a different reasoning model when one exists", () => {
    const options = mergePromptSdlcModelOptions({
      installedWriterIds: ["cursor", "claude-cli"],
      cursorCloudConnected: false,
    });

    expect(pickPromptSdlcDefaultModelIds(options)).toEqual({
      judgeId: "writer:claude-cli",
      improverId: "writer:cursor",
    });
    expect(pickPromptSdlcDefaultModelIds(options.slice(0, 1))).toEqual({
      judgeId: "writer:claude-cli",
      improverId: "writer:claude-cli",
    });
    expect(pickPromptSdlcDefaultModelIds([])).toBeNull();
  });

  it("keeps a reasoning writer as the judge when a local model is listed first", () => {
    const localFirst = [
      {
        id: "ollama:qwen2.5:7b",
        label: "Ollama qwen2.5:7b",
        choice: { kind: "ollama" as const, model: "qwen2.5:7b" },
      },
      {
        id: "writer:claude-cli",
        label: "Claude (terminal)",
        choice: { kind: "writer" as const, writerAgent: "claude-cli" as const },
      },
    ];

    expect(pickPromptSdlcDefaultModelIds(localFirst)).toEqual({
      judgeId: "writer:claude-cli",
      improverId: "ollama:qwen2.5:7b",
    });
  });
});
