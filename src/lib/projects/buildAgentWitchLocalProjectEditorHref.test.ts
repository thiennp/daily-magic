import { describe, expect, it } from "vitest";

import buildAgentWitchLocalProjectEditorHref from "@/lib/projects/buildAgentWitchLocalProjectEditorHref";

describe("buildAgentWitchLocalProjectEditorHref (DF-033)", () => {
  it("deep-links the Mac app instead of the retired 43347 project page", () => {
    const href = buildAgentWitchLocalProjectEditorHref("abc-123");
    expect(href).toBe("agentwitch-local://status?project=abc-123");
    expect(href).not.toContain("43347");
    expect(href).not.toContain("http");
  });
  it("carries the Pitfalls tab and trims the id", () => {
    expect(buildAgentWitchLocalProjectEditorHref(" abc-123 ", "pitfalls")).toBe(
      "agentwitch-local://status?project=abc-123&tab=pitfalls",
    );
  });
});
