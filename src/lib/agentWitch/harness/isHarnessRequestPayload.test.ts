import { describe, expect, it } from "vitest";

import isHarnessRequestPayload from "./isHarnessRequestPayload";

describe("isHarnessRequestPayload", () => {
  it("accepts valid harness request payloads", () => {
    expect(
      isHarnessRequestPayload({
        writerAgent: "claude-cli",
        instruction: "write harness",
        spec: {
          name: "Rules",
          slug: "rules",
          items: [
            {
              id: "item-1",
              kind: "rule",
              title: "No Let",
              content: "Prefer const.",
            },
          ],
        },
      }),
    ).toBe(true);
  });

  it("rejects incomplete harness request payloads", () => {
    expect(
      isHarnessRequestPayload({
        writerAgent: "claude-cli",
        spec: {
          name: "Rules",
          slug: "rules",
          items: [],
        },
      }),
    ).toBe(false);
  });
});
