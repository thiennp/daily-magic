import { describe, expect, it } from "vitest";

import { extractPromptSdlcJsonObject } from "./extractPromptSdlcJsonObject";
import { parsePromptSdlcGeneralizeReply } from "./parsePromptSdlcGeneralizeReply";

describe("extractPromptSdlcJsonObject", () => {
  it("ignores trailing prose that contains a closing brace", () => {
    const payload = {
      templatedPrompt: "Do {{task}}",
      variables: [{ name: "task", description: "x", sampleValue: "y" }],
    };
    const raw = `${JSON.stringify(payload)}

Note: avoid stray } characters in prompts.`;

    expect(extractPromptSdlcJsonObject(raw)).toEqual(payload);
    expect(parsePromptSdlcGeneralizeReply(raw).templatedPrompt).toBe(
      "Do {{task}}",
    );
  });

  it("repairs unescaped newlines inside string values", () => {
    const raw =
      '{"templatedPrompt":"Line one\nLine two","variables":[{"name":"task","description":"d","sampleValue":"s"}]}';

    const parsed = extractPromptSdlcJsonObject(raw) as {
      templatedPrompt: string;
    };
    expect(parsed.templatedPrompt).toBe("Line one\nLine two");
  });

  it("throws a clearer error when JSON is truncated mid-string", () => {
    const truncated = `{"templatedPrompt":"${"x".repeat(520)}cut off without closing quote`;

    expect(() => extractPromptSdlcJsonObject(truncated)).toThrow(
      /cut off or had unescaped line breaks/i,
    );
  });
});
