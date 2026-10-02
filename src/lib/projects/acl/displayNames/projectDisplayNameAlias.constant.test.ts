import { describe, expect, it } from "vitest";

import { PROJECT_DISPLAY_NAME_ALIAS_TTL_DAYS } from "@/lib/projects/acl/displayNames/projectDisplayNameAlias.constant";

describe("PROJECT_DISPLAY_NAME_ALIAS_TTL_DAYS", () => {
  it("defaults to 7 days", () => {
    expect(PROJECT_DISPLAY_NAME_ALIAS_TTL_DAYS).toBe(7);
  });
});
