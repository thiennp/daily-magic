import { describe, expect, it } from "vitest";

import { extractImprovedPrompt } from "@/lib/promptSdlc/extractImprovedPrompt";

describe("extractImprovedPrompt", () => {
  it("uses a fenced prompt and rejects a bare verdict", () => {
    expect(extractImprovedPrompt("```text\nDo the thing\n```")).toBe(
      "Do the thing",
    );
    expect(
      extractImprovedPrompt('{"score": 1, "passed": false, "reasons": "no"}'),
    ).toBeNull();
    expect(extractImprovedPrompt("   ")).toBeNull();
    expect(extractImprovedPrompt("Ask for the acceptance notes.")).toBe(
      "Ask for the acceptance notes.",
    );
  });
});
