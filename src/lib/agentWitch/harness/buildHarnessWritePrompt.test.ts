import { describe, expect, it } from "vitest";

import buildHarnessWritePrompt from "./buildHarnessWritePrompt";
import sanitizeHarnessSlug from "./sanitizeHarnessSlug";
import resolveHarnessItemPath from "./resolveHarnessItemPath";

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

describe("buildHarnessWritePrompt", () => {
  it("includes set metadata and item content", () => {
    const prompt = buildHarnessWritePrompt({
      name: "Daily Magic Rules",
      slug: "daily-magic-rules",
      items: [
        {
          id: "item-1",
          kind: "rule",
          title: "No Let",
          content: "Prefer const.",
        },
      ],
    });

    expect(prompt).toContain("daily-magic-rules");
    expect(prompt).toContain("rules/no-let.mdc");
    expect(prompt).toContain("Prefer const.");
    expect(prompt).toContain("HARNESS_MANIFEST_JSON_START");
  });
});
