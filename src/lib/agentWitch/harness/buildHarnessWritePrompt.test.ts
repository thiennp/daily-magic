import { describe, expect, it } from "vitest";

import buildHarnessCreateSetPrompt from "./buildHarnessCreateSetPrompt";
import buildHarnessWriteItemsPrompt from "./buildHarnessWriteItemsPrompt";
import sanitizeHarnessSlug from "./sanitizeHarnessSlug";
import resolveHarnessItemPath from "./resolveHarnessItemPath";
import resolveHarnessSharedItemPath from "./resolveHarnessSharedItemPath";

describe("sanitizeHarnessSlug", () => {
  it("normalizes harness set names", () => {
    expect(sanitizeHarnessSlug("My Frontend Rules")).toBe("my-frontend-rules");
    expect(sanitizeHarnessSlug("   ")).toBe("harness-set");
  });
});

describe("resolveHarnessItemPath", () => {
  it("maps harness kinds to local paths", () => {
    expect(resolveHarnessItemPath("rule", "No Let")).toBe("rules/no-let.mdc");
    expect(resolveHarnessItemPath("skill", "Testing Patterns")).toBe(
      "skills/testing-patterns/SKILL.md",
    );
    expect(resolveHarnessItemPath("command", "Commit")).toBe(
      "commands/commit.md",
    );
  });
});

describe("resolveHarnessSharedItemPath", () => {
  it("stores items under shared/items/{id}", () => {
    expect(resolveHarnessSharedItemPath("item-1", "rule", "No Let")).toBe(
      "shared/items/item-1/rules/no-let.mdc",
    );
  });
});

describe("buildHarnessCreateSetPrompt", () => {
  it("includes set metadata for empty set creation", () => {
    const prompt = buildHarnessCreateSetPrompt({
      name: "Daily Magic Rules",
      slug: "daily-magic-rules",
    });

    expect(prompt).toContain("daily-magic-rules");
    expect(prompt).toContain("items: []");
    expect(prompt).toContain("HARNESS_MANIFEST_JSON_START");
  });
});

describe("buildHarnessWriteItemsPrompt", () => {
  it("includes shared item paths and target sets", () => {
    const prompt = buildHarnessWriteItemsPrompt([
      {
        id: "item-1",
        kind: "rule",
        title: "No Let",
        content: "Prefer const.",
        setSlugs: ["daily-magic-rules", "team-defaults"],
      },
    ]);

    expect(prompt).toContain("shared/items/item-1/rules/no-let.mdc");
    expect(prompt).toContain("daily-magic-rules, team-defaults");
    expect(prompt).toContain("Prefer const.");
    expect(prompt).toContain("HARNESS_MANIFEST_JSON_START");
  });
});
