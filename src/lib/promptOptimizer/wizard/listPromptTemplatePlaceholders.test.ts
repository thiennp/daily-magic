import { describe, expect, it } from "vitest";

import { listPromptTemplatePlaceholders } from "./listPromptTemplatePlaceholders";

describe("listPromptTemplatePlaceholders", () => {
  it("returns unique names in order", () => {
    expect(
      listPromptTemplatePlaceholders("{{a}} and {{b}} then {{a}} again"),
    ).toEqual(["a", "b"]);
  });
});
