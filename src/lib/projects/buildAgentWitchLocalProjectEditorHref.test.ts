import { describe, expect, it } from "vitest";

import buildAgentWitchLocalProjectEditorHref from "@/lib/projects/buildAgentWitchLocalProjectEditorHref";

describe("buildAgentWitchLocalProjectEditorHref", () => {
  it("points at AWL loopback project editor", () => {
    expect(buildAgentWitchLocalProjectEditorHref("abc-123")).toBe(
      "http://127.0.0.1:43347/project?id=abc-123",
    );
  });
});
