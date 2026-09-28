import { describe, expect, it } from "vitest";

import { readPromptSdlcWriterTokens } from "./readPromptSdlcWriterTokens";

describe("readPromptSdlcWriterTokens", () => {
  it("uses the Claude result total, including cache tokens", () => {
    const raw = JSON.stringify({
      type: "result",
      result: "Name the facts.",
      usage: {
        input_tokens: 100,
        cache_read_input_tokens: 20,
        output_tokens: 30,
      },
    });

    expect(readPromptSdlcWriterTokens(raw)).toBe(150);
  });

  it("uses the last usage pair and ignores a reply with no usage", () => {
    const raw =
      '{"input_tokens":1,"output_tokens":1}\n{"inputTokens":10,"outputTokens":5}';

    expect(readPromptSdlcWriterTokens(raw)).toBe(15);
    expect(readPromptSdlcWriterTokens("Name the facts.")).toBeNull();
  });
});
