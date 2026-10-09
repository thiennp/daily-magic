import { describe, expect, it } from "vitest";

import {
  DEFINITION_OF_DONE_MAX_CHARS,
  parseDefinitionOfDoneBody,
} from "@/lib/projects/definitionOfDone/parseDefinitionOfDoneBody";

describe("parseDefinitionOfDoneBody", () => {
  it("trims and sets a body", () => {
    expect(parseDefinitionOfDoneBody({ body: "  Tests pass.  " })).toEqual({
      kind: "set",
      body: "Tests pass.",
    });
  });

  it("clears on blank", () => {
    expect(parseDefinitionOfDoneBody({ body: "  \n" })).toEqual({
      kind: "clear",
    });
  });

  it("refuses a missing or non-string body", () => {
    for (const raw of [null, {}, { body: 3 }, "x"]) {
      expect(parseDefinitionOfDoneBody(raw)).toEqual({
        kind: "invalid",
        reason: "bad_body",
      });
    }
  });

  it("refuses more than the limit", () => {
    expect(
      parseDefinitionOfDoneBody({
        body: "a".repeat(DEFINITION_OF_DONE_MAX_CHARS + 1),
      }),
    ).toEqual({ kind: "invalid", reason: "too_long" });
    expect(
      parseDefinitionOfDoneBody({
        body: "a".repeat(DEFINITION_OF_DONE_MAX_CHARS),
      }).kind,
    ).toBe("set");
  });
});
