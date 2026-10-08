import { describe, expect, it } from "vitest";

import {
  assistantInitials,
  filterSupportedAssistants,
} from "@/features/projects/access/invites/awcSupportedAssistants";

describe("supported assistants helpers", () => {
  it("filters by label or hint, empty query keeps all", () => {
    expect(filterSupportedAssistants("").length).toBe(15);
    expect(filterSupportedAssistants("webhook").map((a) => a.id)).toContain(
      "custom-https",
    );
    expect(filterSupportedAssistants("zzzz")).toEqual([]);
  });
  it("builds initials", () => {
    expect(assistantInitials("Grok Bot")).toBe("GB");
    expect(assistantInitials("n8n/Zapier")).toBe("NZ");
    expect(assistantInitials("Claude")).toBe("C");
  });
});
