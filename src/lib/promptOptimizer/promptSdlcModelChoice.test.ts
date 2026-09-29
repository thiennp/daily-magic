import { describe, expect, it } from "vitest";

import {
  parsePromptSdlcModelChoice,
  promptSdlcChoiceNeedsMac,
  promptSdlcModelId,
} from "@/lib/promptOptimizer/promptSdlcModelChoice";

describe("promptSdlcModelChoice", () => {
  it("accepts writers and Ollama models and rejects junk", () => {
    const writer = parsePromptSdlcModelChoice("writer", "cursor");
    const ollama = parsePromptSdlcModelChoice("ollama", " qwen2.5:7b ");

    expect(writer).toEqual({ kind: "writer", writerAgent: "cursor" });
    expect(ollama).toEqual({ kind: "ollama", model: "qwen2.5:7b" });
    expect(writer !== null && promptSdlcModelId(writer)).toBe("writer:cursor");
    expect(ollama !== null && promptSdlcChoiceNeedsMac(ollama)).toBe(false);
    expect(writer !== null && promptSdlcChoiceNeedsMac(writer)).toBe(true);
    expect(parsePromptSdlcModelChoice("writer", "cursor-cloud")).toEqual({
      kind: "writer",
      writerAgent: "cursor-cloud",
    });
    expect(
      promptSdlcChoiceNeedsMac({
        kind: "writer",
        writerAgent: "cursor-cloud",
      }),
    ).toBe(false);
    expect(parsePromptSdlcModelChoice("writer", "nope")).toBeNull();
    expect(parsePromptSdlcModelChoice("ollama", "bad\nmodel")).toBeNull();
    expect(parsePromptSdlcModelChoice("other", "cursor")).toBeNull();
  });
});
