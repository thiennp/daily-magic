import { describe, expect, it } from "vitest";

import { extractUserTaskFromWrappedPrompt } from "./extractUserTaskFromWrappedPrompt";

describe("extractUserTaskFromWrappedPrompt", () => {
  it("returns the first section before hub instruction blocks", () => {
    expect(
      extractUserTaskFromWrappedPrompt(
        "Ship auth tests\n\n---\n[[WORKING_ESTIMATE]] instructions",
      ),
    ).toBe("Ship auth tests");
  });
});
