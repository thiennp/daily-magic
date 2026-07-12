import { describe, expect, it } from "vitest";

import isHarnessRequestPayload from "./isHarnessRequestPayload";

describe("isHarnessRequestPayload", () => {
  it("accepts create-set harness request payloads", () => {
    expect(
      isHarnessRequestPayload({
        writerAgent: "claude-cli",
        instruction: "create harness set",
        spec: {
          mode: "create-set",
          name: "Rules",
          slug: "rules",
        },
      }),
    ).toBe(true);
  });

  it("accepts write-items harness request payloads", () => {
    expect(
      isHarnessRequestPayload({
        writerAgent: "claude-cli",
        instruction: "write harness items",
        spec: {
          mode: "write-items",
          items: [
            {
              id: "item-1",
              kind: "rule",
              title: "No Let",
              content: "Prefer const.",
              setSlugs: ["rules"],
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
        instruction: "write harness items",
        spec: {
          mode: "write-items",
          items: [],
        },
      }),
    ).toBe(false);
  });
});
