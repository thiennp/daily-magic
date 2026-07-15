import { describe, expect, it } from "vitest";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

describe("buildAgentComposerHref", () => {
  it("opens the home send-task modal by default", () => {
    expect(buildAgentComposerHref()).toBe("/?sendTask=1");
  });

  it("preserves library and prompt prefill params", () => {
    expect(
      buildAgentComposerHref({
        libraryCapabilityId: "cap-1",
        prompt: "hello",
      }),
    ).toBe("/?sendTask=1&libraryCapabilityId=cap-1&prompt=hello");
  });
});
