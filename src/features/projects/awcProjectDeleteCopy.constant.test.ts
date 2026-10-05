import { describe, expect, it } from "vitest";

import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";

describe("AWC_PROJECT_DELETE_COPY", () => {
  it("names library items and reports in the delete scope", () => {
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("library items");
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("reports");
  });
});
