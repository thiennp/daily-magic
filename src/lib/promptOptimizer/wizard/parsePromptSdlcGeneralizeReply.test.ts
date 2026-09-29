import { describe, expect, it } from "vitest";

import { parsePromptSdlcGeneralizeReply } from "./parsePromptSdlcGeneralizeReply";

describe("parsePromptSdlcGeneralizeReply", () => {
  it("parses JSON from a fenced reply", () => {
    const parsed = parsePromptSdlcGeneralizeReply(`
\`\`\`json
{"templatedPrompt":"Do {{task}}","variables":[{"name":"task","description":"x","sampleValue":"y"}]}
\`\`\`
`);
    expect(parsed.templatedPrompt).toBe("Do {{task}}");
    expect(parsed.variables).toHaveLength(1);
  });
});
