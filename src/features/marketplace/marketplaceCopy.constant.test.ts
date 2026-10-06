import { describe, expect, it } from "vitest";

import {
  MARKETPLACE_PAGE_DESCRIPTION,
  MARKETPLACE_SEARCH_PLACEHOLDER,
} from "@/features/marketplace/marketplaceCopy.constant";

describe("marketplaceCopy", () => {
  it("matches bright HTML page description and avoids bot wording", () => {
    expect(MARKETPLACE_PAGE_DESCRIPTION).toBe(
      "Playbooks, assistants and harness sets for your project.",
    );
    expect(MARKETPLACE_PAGE_DESCRIPTION.toLowerCase()).not.toContain("bot");
    expect(MARKETPLACE_SEARCH_PLACEHOLDER.toLowerCase()).not.toContain("bot");
  });
});
