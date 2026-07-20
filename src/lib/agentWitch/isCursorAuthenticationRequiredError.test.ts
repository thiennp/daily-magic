import { describe, expect, it } from "vitest";

import { CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET } from "@/lib/agentWitch/cursorAuthenticationRequiredErrorSnippet.constant";
import { isCursorAuthenticationRequiredError } from "@/lib/agentWitch/isCursorAuthenticationRequiredError";

describe("isCursorAuthenticationRequiredError (AGENT-044)", () => {
  it("detects the Cursor CLI authentication required error", () => {
    expect(
      isCursorAuthenticationRequiredError(
        `Error: ${CURSOR_AUTHENTICATION_REQUIRED_ERROR_SNIPPET}`,
      ),
    ).toBe(true);
  });

  it("ignores unrelated terminal output", () => {
    expect(isCursorAuthenticationRequiredError("hello world")).toBe(false);
  });
});
